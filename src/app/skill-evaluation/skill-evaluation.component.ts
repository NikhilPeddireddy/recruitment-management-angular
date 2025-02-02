import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Candidate } from '../../models/candidate.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skill-evaluation',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './skill-evaluation.component.html',
  styleUrls: ['./skill-evaluation.component.css'],
})
export class SkillEvaluationComponent {
  @Input() candidate: Candidate | null = null;
  @Output() updateEvaluation = new EventEmitter<{ id: number; score: number; status: string }>();

  score: number | string = '';  
  error = '';

  
  ngOnInit() {
    if (this.candidate) {
      this.score = this.candidate.evaluated ? this.candidate.score ?? '' : '';  
    }
  }

  handleSubmit() {
    
    const parsedScore = Number(this.score);

    
    if (isNaN(parsedScore) || parsedScore < 0 || parsedScore > 100) {
      this.error = 'Score must be a number between 0 and 100.';
      return;
    }

    const status = parsedScore >= 50 ? 'Pass' : 'Fail';

    
    if (this.candidate) {
      this.updateEvaluation.emit({
        id: this.candidate.id,
        score: parsedScore,
        status,
      });
      this.error = '';  
    } else {
      this.error = 'No candidate data available.';
    }
  }
}
