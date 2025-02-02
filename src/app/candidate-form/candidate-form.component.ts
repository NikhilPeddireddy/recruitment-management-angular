import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-candidate-form',
  imports:[FormsModule],
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.css'],
})
export class CandidateFormComponent {
  
  newCandidate = {
    name: '',
    email: '',
    phone: '',
    position: '',
    stage: 'Application Received',
    resume: '', 
  };

  @Output() addCandidate = new EventEmitter<any>();

  onSubmit() {
    if (
      this.newCandidate.name &&
      this.newCandidate.email &&
      this.newCandidate.phone &&
      this.newCandidate.position &&
      this.newCandidate.resume
    ) {
      this.addCandidate.emit({ ...this.newCandidate });
      this.resetForm(); 
    } else {
      alert('Please fill in all fields, including the resume!');
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      this.newCandidate.resume = fileURL;
    }
  }

 
  resetForm() {
    this.newCandidate = {
      name: '',
      email: '',
      phone: '',
      position: '',
      stage: 'Application Received',
      resume: '',
    };
    const fileInput: HTMLInputElement | null = document.querySelector('#resume');
    if (fileInput) {
      fileInput.value = ''; 
    }
  }
}
