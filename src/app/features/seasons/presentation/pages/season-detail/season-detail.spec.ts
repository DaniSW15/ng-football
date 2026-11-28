import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { convertToParamMap, ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { SeasonDetailPage } from './season-detail';
import { SeasonsStore } from '@seasons/presentation/state/seasons-store';

describe('SeasonDetailPage', () => {
  let component: SeasonDetailPage;
  let fixture: ComponentFixture<SeasonDetailPage>;
  let loadSeasonDetailSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    loadSeasonDetailSpy = vi.fn();

    await TestBed.configureTestingModule({
      imports: [SeasonDetailPage],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(
              convertToParamMap({
                seasonId: 'a7d846ec-314c-480f-9101-9b270efc89b1',
              })
            ),
          },
        },
        {
          provide: SeasonsStore,
          useValue: {
            selectedSeason: signal({
              id: 'a7d846ec-314c-480f-9101-9b270efc89b1',
              competitionId: '22222222-2222-2222-2222-222222222222',
              name: '2025/2026',
              startDate: '2025-08-15',
              endDate: '2026-05-30',
              status: 'draft',
              createdAt: '2026-11-25T01:00:00Z',
            }),
            competitions: signal([]),
            teams: signal([]),
            teamById: signal(new Map()),
            enrolledTeamIds: signal(new Set()),
            enrollments: signal([]),
            enrollmentCount: signal(0),
            isDetailLoading: signal(false),
            activatingSeasonId: signal(null),
            error: signal(null),
            successMessage: signal(null),
            loadSeasonDetail: loadSeasonDetailSpy,
            activateSeason: () => {},
            enrollTeam: async () => undefined,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SeasonDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load season detail from route parameter', () => {
    expect(component).toBeTruthy();
    expect(loadSeasonDetailSpy).toHaveBeenCalledWith(
      'a7d846ec-314c-480f-9101-9b270efc89b1'
    );
  });
});
