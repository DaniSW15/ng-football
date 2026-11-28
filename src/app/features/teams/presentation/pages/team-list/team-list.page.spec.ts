import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { TeamListPage } from './team-list.page';
import { TeamsStore } from '@teams/presentation/state/teams-store';

describe('TeamListPage', () => {
  let component: TeamListPage;
  let fixture: ComponentFixture<TeamListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamListPage],
      providers: [
        {
          provide: TeamsStore,
          useValue: {
            teams: signal([]),
            teamCount: signal(0),
            isLoading: signal(false),
            deletingTeamId: signal(null),
            error: signal(null),
            successMessage: signal(null),
            loadTeams: () => {},
            createTeam: async () => undefined,
            renameTeam: async () => undefined,
            deleteTeam: () => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
