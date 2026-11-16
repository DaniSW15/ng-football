import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TeamsStore } from './teams-store';
import { GetTeamsUsecase } from '../../application/get-teams-usecase';
import { CreateTeamUsecase } from '../../application/create-team-usecase';

describe('TeamsStore', () => {
  let service: TeamsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TeamsStore,
        {
          provide: GetTeamsUsecase,
          useValue: {
            execute: () => of([]),
          },
        },
        {
          provide: CreateTeamUsecase,
          useValue: {
            execute: () => of(),
          },
        },
      ],
    });
    service = TestBed.inject(TeamsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
