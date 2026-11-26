import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SeasonCard } from './season-card';
import { Season } from '../../../domain/season-model';

describe('SeasonCard', () => {
  let component: SeasonCard;
  let fixture: ComponentFixture<SeasonCard>;

  const draftSeason: Season = {
    id: 'a7d846ec-314c-480f-9101-9b270efc89b1',
    competitionId: '22222222-2222-2222-2222-222222222222',
    name: '2025/2026',
    startDate: '2025-08-15',
    endDate: '2026-05-30',
    status: 'draft',
    createdAt: '2026-11-25T01:00:00Z',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeasonCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SeasonCard);
    fixture.componentRef.setInput('season', draftSeason);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and format season status label', () => {
    expect(component).toBeTruthy();
    expect(component.getStatusLabel()).toBe('Borrador');
    expect(component.formatDate('2025-08-15')).toBe('15 ago 2025');
  });

  it('should emit activate only after inline confirmation', () => {
    const emitted: string[] = [];
    component.activate.subscribe((id) => emitted.push(id));

    component.startConfirm();
    expect(component.confirmingActivate()).toBe(true);
    expect(emitted).toEqual([]);

    component.confirmActivate();
    expect(component.confirmingActivate()).toBe(false);
    expect(emitted).toEqual([draftSeason.id]);
  });
});
