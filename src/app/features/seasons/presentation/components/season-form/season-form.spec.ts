import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeasonForm } from './season-form';

describe('SeasonForm', () => {
  let component: SeasonForm;
  let fixture: ComponentFixture<SeasonForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeasonForm],
    }).compileComponents();

    fixture = TestBed.createComponent(SeasonForm);
    fixture.componentRef.setInput('submitSeason', async () => undefined);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when initialized with empty fields', () => {
    expect(component.seasonForm().invalid()).toBe(true);
  });

  it('should reject endDate earlier than or equal to startDate', () => {
    component.seasonModel.set({
      name: '2025/2026',
      startDate: '2025-08-15',
      endDate: '2025-08-15',
    });
    fixture.detectChanges();

    expect(component.seasonForm.endDate().invalid()).toBe(true);
    expect(component.seasonForm.endDate().errors()[0]?.kind).toBe('dateRange');
  });

  it('should be valid when name and date range are valid', () => {
    component.seasonModel.set({
      name: '2025/2026',
      startDate: '2025-08-15',
      endDate: '2026-05-30',
    });
    fixture.detectChanges();

    expect(component.seasonForm().valid()).toBe(true);
  });
});
