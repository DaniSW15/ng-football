import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { SeasonList } from './season-list';
import { SeasonsStore } from '../../state/seasons-store';

describe('SeasonList', () => {
  let component: SeasonList;
  let fixture: ComponentFixture<SeasonList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeasonList],
      providers: [
        provideRouter([]),
        {
          provide: SeasonsStore,
          useValue: {
            competitions: signal([]),
            selectedCompetitionId: signal(null),
            selectedCompetition: signal(null),
            seasons: signal([]),
            seasonCount: signal(0),
            isLoading: signal(false),
            activatingSeasonId: signal(null),
            error: signal(null),
            successMessage: signal(null),
            loadReferenceData: () => {},
            selectCompetition: () => {},
            createSeason: async () => undefined,
            activateSeason: () => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SeasonList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
