import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CompetitionCard } from './competition-card';
import { Competition } from '../../../domain/competition-model';

describe('CompetitionCard', () => {
  let component: CompetitionCard;
  let fixture: ComponentFixture<CompetitionCard>;

  const mockCompetition: Competition = {
    id: '22222222-2222-2222-2222-222222222222',
    name: 'LaLiga EA Sports',
    competitionType: 'league',
    scope: 'domestic',
    countryCode: 'ES',
    createdAt: '2026-11-25T01:00:00Z',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CompetitionCard);
    fixture.componentRef.setInput('competition', mockCompetition);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format type label correctly', () => {
    expect(component.getTypeLabel('league')).toContain('Liga');
    expect(component.getTypeLabel('cup')).toContain('Copa');
  });
});
