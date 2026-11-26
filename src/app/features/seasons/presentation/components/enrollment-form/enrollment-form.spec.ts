import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnrollmentForm } from './enrollment-form';

describe('EnrollmentForm', () => {
  let component: EnrollmentForm;
  let fixture: ComponentFixture<EnrollmentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollmentForm],
    }).compileComponents();

    fixture = TestBed.createComponent(EnrollmentForm);
    fixture.componentRef.setInput('teams', [
      {
        id: '11111111-1111-1111-1111-111111111111',
        name: 'FC Demo',
        createdAt: '2026-11-25T01:00:00Z',
      },
    ]);
    fixture.componentRef.setInput('submitEnrollment', async () => undefined);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and start invalid without team selection', () => {
    expect(component).toBeTruthy();
    expect(component.enrollmentForm().invalid()).toBe(true);
  });

  it('should become valid when a teamId is selected and optional groupName is <= 20 chars', () => {
    component.enrollmentModel.set({
      teamId: '11111111-1111-1111-1111-111111111111',
      groupName: 'Grupo A',
    });
    fixture.detectChanges();

    expect(component.enrollmentForm().valid()).toBe(true);
  });

  it('should invalidate groupName longer than 20 characters', () => {
    component.enrollmentModel.set({
      teamId: '11111111-1111-1111-1111-111111111111',
      groupName: '123456789012345678901',
    });
    fixture.detectChanges();

    expect(component.enrollmentForm.groupName().invalid()).toBe(true);
  });
});
