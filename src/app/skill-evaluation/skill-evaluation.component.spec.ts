import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillEvaluationComponent } from './skill-evaluation.component';

describe('SkillEvaluationComponent', () => {
  let component: SkillEvaluationComponent;
  let fixture: ComponentFixture<SkillEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillEvaluationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
