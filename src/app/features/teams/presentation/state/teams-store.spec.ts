import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { TeamsStore } from './teams-store';
import { GetTeamsUsecase } from '@teams/application/get-teams-usecase';
import { CreateTeamUsecase } from '@teams/application/create-team-usecase';
import { RenameTeamUsecase } from '@teams/application/rename-team-usecase';
import { DeleteTeamUsecase } from '@teams/application/delete-team-usecase';
import { Team } from '@teams/domain/team.model';

describe('TeamsStore', () => {
  let store: TeamsStore;
  let renameSpy: ReturnType<typeof vi.fn>;
  let deleteSpy: ReturnType<typeof vi.fn>;

  const mockTeam: Team = {
    id: '11111111-1111-1111-1111-111111111111',
    name: 'Real Madrid CF',
    createdAt: '2026-11-25T01:00:00Z',
  };

  beforeEach(() => {
    renameSpy = vi.fn(() =>
      of({ ...mockTeam, name: 'Real Madrid' })
    );
    deleteSpy = vi.fn(() => of(void 0));

    TestBed.configureTestingModule({
      providers: [
        TeamsStore,
        {
          provide: GetTeamsUsecase,
          useValue: {
            execute: () => of([mockTeam]),
          },
        },
        {
          provide: CreateTeamUsecase,
          useValue: {
            execute: () => of(mockTeam),
          },
        },
        {
          provide: RenameTeamUsecase,
          useValue: {
            execute: renameSpy,
          },
        },
        {
          provide: DeleteTeamUsecase,
          useValue: {
            execute: deleteSpy,
          },
        },
      ],
    });
    store = TestBed.inject(TeamsStore);
  });

  it('should be created and load teams', () => {
    expect(store).toBeTruthy();
    store.loadTeams();
    expect(store.teams()).toEqual([mockTeam]);
  });

  it('should update team name on renameTeam', async () => {
    store.teams.set([mockTeam]);

    const result = await store.renameTeam(mockTeam.id, { name: 'Real Madrid' });

    expect(result).toBeUndefined();
    expect(renameSpy).toHaveBeenCalledWith(mockTeam.id, {
      name: 'Real Madrid',
    });
    expect(store.teams()[0].name).toBe('Real Madrid');
  });

  it('should remove team on deleteTeam', () => {
    store.teams.set([mockTeam]);

    store.deleteTeam(mockTeam.id);

    expect(deleteSpy).toHaveBeenCalledWith(mockTeam.id);
    expect(store.teams()).toEqual([]);
  });

  it('should return serverError when renameTeam fails', async () => {
    renameSpy.mockReturnValueOnce(
      throwError(() => new Error('No tienes permiso para realizar esta acción.'))
    );

    const result = await store.renameTeam(mockTeam.id, { name: 'Nuevo Nombre' });

    expect(result).toEqual({
      kind: 'serverError',
      message: 'No tienes permiso para realizar esta acción.',
    });
    expect(store.error()).toBe('No tienes permiso para realizar esta acción.');
  });
});
