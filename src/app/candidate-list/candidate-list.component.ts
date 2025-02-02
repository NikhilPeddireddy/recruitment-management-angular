import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Candidate } from '../../models/candidate.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css'],
})
export class CandidateListComponent {
  @Input() candidates: Candidate[] = []; 
  @Output() deleteCandidate: EventEmitter<number> = new EventEmitter<number>();
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Output() filter: EventEmitter<string> = new EventEmitter<string>();

  searchTerm: string = ''; 
  filterStage: string = ''; 
  filteredCandidates: Candidate[] = []; 

 
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['candidates'] && changes['candidates'].currentValue) {
      this.filteredCandidates = [...this.candidates];
      this.filterCandidates(); 
    }
  }

 
  onSearch(): void {
    this.filterCandidates(); 
    this.search.emit(this.searchTerm); 
  }

 
  onFilter(): void {
    this.filterCandidates(); 
    this.filter.emit(this.filterStage); 
  }

  
  onDeleteCandidate(candidateId: number | undefined): void {
    if (candidateId !== undefined) {
      this.deleteCandidate.emit(candidateId); 
      this.filteredCandidates = this.filteredCandidates.filter(
        (candidate) => candidate.id !== candidateId
      );
    } else {
      console.error('Candidate ID is undefined. Cannot delete.');
    }
  }

 
  onStageChange(candidateId: number | undefined, event: Event): void {
    if (candidateId !== undefined) {
      const newValue = (event.target as HTMLSelectElement).value; 
      this.updateStage(candidateId, newValue);
    }
  }

  
  updateStage(candidateId: number, newStage: string): void {
    const candidate = this.candidates.find((c) => c.id === candidateId);
    if (candidate) {
      candidate.stage = newStage; 
    }
    this.filterCandidates(); 
  }

 
  onReset(): void {
    this.searchTerm = ''; 
    this.filterStage = ''; 
    this.filteredCandidates = [...this.candidates]; 
    this.search.emit(this.searchTerm); 
    this.filter.emit(this.filterStage); 
  }

  
  private filterCandidates(): void {
    this.filteredCandidates = this.candidates.filter((candidate) => {
      const matchesSearch =
        !this.searchTerm ||
        candidate.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        candidate.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        candidate.position.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesStage = !this.filterStage || candidate.stage === this.filterStage;

      return matchesSearch && matchesStage;
    });
  }
}
