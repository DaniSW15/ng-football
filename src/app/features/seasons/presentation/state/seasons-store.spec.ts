import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { GetCompetitionsUsecase } from '@competitions/application/get-competitions-usecase';
import { GetTeamsUsecase } from '@teams/application/get-teams-usecase';
import { SeasonsStore } from './seasons-store';
import { GetSeasonsByCompetitionUsecase } from '@seasons/application/get-seasons-by-competition-usecase';
import { GetSeasonUsecase } from '@seasons/application/get-season-usecase';
import { CreateSeasonUsecase } from '@seasons/application/create-season-usecase';
import { ActivateSeasonUsecase } from '@seasons/application/activate-season-usecase';
import { GetEnrollmentsUsecase } from '@seasons/application/get-enrollments-usecase';
import { EnrollTeamUsecase } from '@seasons/application/enroll-team-usecase';
import { Enrollment, Season } from '@seasons/domain/season-model';

describe('SeasonsStore', () => {
  let store: SeasonsStore;

  const mockSeason: Season = {
    id: 'a7d846ec-314c-480f-9101-9b270efc89b1',
    competitionId: '22222222-2222-2222-2222-222222222222',
    name: '2025/2026',
    startDate: '2025-08-15',
    endDate: '2026-05-30',
    status: 'draft',
    createdAt: '2026-11-25T01:00:00Z',
  };

  const mockEnrollment: Enrollment = {
    id: '33333333-3333-3333-3333-333333333333',
    seasonId: mockSeason.id,
    teamId: '11111111-1111-1111-1111-111111111111',
    groupName: null,
    createdAt: '2026-11-25T01:00:00Z',
  };

  let activateSpy: ReturnType<typeof vi.fn>;
  let enrollSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    activateSpy = vi.fn(() => of({ ...mockSeason, status: 'active' as const }));
    enrollSpy = vi.fn(() => of(mockEnrollment));

    TestBed.configureTestingModule({
      providers: [
        SeasonsStore,
        {
          provide: GetSeasonsByCompetitionUsecase,
          useValue: { execute: () => of([mockSeason]) },
        },
        {
          provide: GetSeasonUsecase,
          useValue: { execute: () => of(mockSeason) },
        },
        {
          provide: CreateSeasonUsecase,
          useValue: { execute: () => of(mockSeason) },
        },
        {
          provide: ActivateSeasonUsecase,
          useValue: { execute: activateSpy },
        },
        {
          provide: GetEnrollmentsUsecase,
          useValue: { execute: () => of([mockEnrollment]) },
        },
        {
          provide: EnrollTeamUsecase,
          useValue: { execute: enrollSpy },
        },
        {
          provide: GetCompetitionsUsecase,
          useValue: {
            execute: () =>
              of([
                {
                  id: mockSeason.competitionId,
                  name: 'LaLiga',
                  competitionType: 'league',
                  scope: 'domestic',
                  countryCode: 'ES',
                  createdAt: '2026-11-25T01:00:00Z',
                },
              ]),
          },
        },
        {
          provide: GetTeamsUsecase,
          useValue: {
            execute: () =>
              of([
                {
                  id: mockEnrollment.teamId,
                  name: 'FC Demo',
                  createdAt: '2026-11-25T01:00:00Z',
                },
              ]),
          },
        },
      ],
    });
    store = TestBed.inject(SeasonsStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should load reference data and seasons for the selected competition', () => {
    store.loadReferenceData(mockSeason.competitionId);

    expect(store.selectedCompetitionId()).toBe(mockSeason.competitionId);
    expect(store.seasons()).toEqual([mockSeason]);
    expect(store.teams().length).toBe(1);
  });

  it('should update season status to active on activateSeason', () => {
    store.seasons.set([mockSeason]);
    store.selectedSeason.set(mockSeason);

    store.activateSeason(mockSeason.id);

    expect(activateSpy).toHaveBeenCalledWith(mockSeason.id);
    expect(store.seasons()[0].status).toBe('active');
    expect(store.selectedSeason()?.status).toBe('active');
  });

  it('should load season detail and enrollments', () => {
    store.loadSeasonDetail(mockSeason.id);

    expect(store.selectedSeason()).toEqual(mockSeason);
    expect(store.enrollments()).toEqual([mockEnrollment]);
  });

  it('should return serverError when enrollTeam fails', async () => {
    enrollSpy.mockReturnValueOnce(
      throwError(() => new Error('El equipo ya se encuentra inscrito.'))
    );

    const result = await store.enrollTeam(mockSeason.id, {
      teamId: mockEnrollment.teamId,
      groupName: null,
    });

    expect(result).toEqual({
      kind: 'serverError',
      message: 'El equipo ya se encuentra inscrito.',
    });
    expect(store.error()).toBe('El equipo ya se encuentra inscrito.');
  });
});
