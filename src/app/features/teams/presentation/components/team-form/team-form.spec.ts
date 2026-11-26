import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamForm } from './team-form';

describe('TeamForm', () => {
  let fixture: ComponentFixture<TeamForm>;
  let component: TeamForm;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamForm],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the form component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with invalid state until name is filled', () => {
    expect(component.teamForm().invalid()).toBe(true);
  });

  it('should reject whitespace-only name and accept valid name', () => {
    component.teamModel.set({ name: '   ' });
    fixture.detectChanges();
    expect(component.teamForm.name().invalid()).toBe(true);

    component.teamModel.set({ name: 'Real Madrid CF' });
    fixture.detectChanges();
    expect(component.teamForm().valid()).toBe(true);
  });
});
