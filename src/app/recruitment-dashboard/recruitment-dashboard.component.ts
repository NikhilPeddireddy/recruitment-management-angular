import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Candidate } from '../../models/candidate.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recruitment-dashboard',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './recruitment-dashboard.component.html',
  styleUrls: ['./recruitment-dashboard.component.css'],
})
export class RecruitmentDashboardComponent {
  @Input() candidates: Candidate[] = [];
  @Output() updateStage = new EventEmitter<{ id: number; stage: string }>();

  stages = ['Application Received', 'Interview Scheduled', 'Offered', 'Rejected'];

  groupByStage(stage: string) {
    return this.candidates.filter((candidate) => candidate.stage === stage);
  }

  
  onStageChange(id: number, newStage: string) {
    this.updateStage.emit({ id, stage: newStage });  
  }
}
