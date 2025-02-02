import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { RecruitmentDashboardComponent } from './recruitment-dashboard/recruitment-dashboard.component';
import { SkillEvaluationComponent } from './skill-evaluation/skill-evaluation.component';
import { Candidate } from '../models/candidate.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CandidateFormComponent,
    CandidateListComponent,
    RecruitmentDashboardComponent,
    SkillEvaluationComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'Recruitment Management System';
  candidates: Candidate[] = [];
  filteredCandidates: Candidate[] = [];
  searchTerm: string = '';
  filterStage: string = '';

  constructor() {
    
    this.candidates = [
      {
        id: 1,
        name: 'Nicky Reddy',
        email: 'nickyreddy@gmail.com',
        phone: '1234567890',
        position: 'Software Engineer',
        stage: 'Application Received',
        evaluated: false,
        status: '',
        resume: "https://example.com/resumes/Nicky_resume.pdf",
      },
      {
        id: 2,
        name: 'Nikhil Peddireddy',
        email: 'nikhilp@yahoo.com',
        phone: '9876543210',
        position: 'Data Scientist',
        stage: 'Interview Scheduled',
        evaluated: false,
        status: '',
        resume: "https://example.com/resumes/Nikhil_resume.pdf",
      },
    ];

    
    this.filteredCandidates = [...this.candidates];
  }

  addCandidate(candidate: Candidate) {
    const newId = this.candidates.length > 0 ? Math.max(...this.candidates.map(c => c.id)) + 1 : 1;
    const newCandidate = { ...candidate, id: newId };
    this.candidates.push(newCandidate);
    this.applyFilters();
  }
  

  deleteCandidate(id: number) {
    this.candidates = this.candidates.filter((candidate) => candidate.id !== id);
    this.applyFilters();
  }

  
  updateStage(event: { id: number; stage: string }) {
    const candidate = this.candidates.find((c) => c.id === event.id);
    if (candidate) {
      candidate.stage = event.stage;
    }
    this.applyFilters();
  }

  handleEvaluationUpdate(event: { id: number; score: number; status: string }) {
    const candidate = this.candidates.find((c) => c.id === event.id);
    if (candidate) {
      candidate.score = event.score;
      candidate.status = event.status;
      candidate.evaluated = true;
    }
  }

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.applyFilters();
  }
  
  onFilter(stage: string) {
    this.filterStage = stage;
    this.applyFilters();
  }
  


  resetFilters() {
    this.searchTerm = '';
    this.filterStage = '';
    this.applyFilters();
  }

  
  private applyFilters() {
    this.filteredCandidates = this.candidates.filter((candidate) => {
      const matchesSearch =
        candidate.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        candidate.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        candidate.position.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesFilter = this.filterStage
        ? candidate.stage === this.filterStage
        : true;

      return matchesSearch && matchesFilter;
    });
  }
}
