import { TestBed } from '@angular/core/testing';
import { TeamForm } from './team-form';

describe('TeamForm', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamForm],
    }).compileComponents();
  });

  it('should create the form component', () => {
    const fixture = TestBed.createComponent(TeamForm);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should initialize with invalid state until filled', () => {
    const fixture = TestBed.createComponent(TeamForm);
    const component = fixture.componentInstance;
    expect(component.teamForm().invalid()).toBe(true);
  });
});
