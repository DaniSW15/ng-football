import { TestBed } from '@angular/core/testing';
import { GetTeamsUsecase } from './get-teams-usecase';
import { TeamRepository } from '../domain/team-repository';

describe('GetTeamsUsecase', () => {
  let service: GetTeamsUsecase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetTeamsUsecase,
        {
          provide: TeamRepository,
          useValue: {
            getAll: () => {},
            getById: () => {},
            create: () => {},
            rename: () => {},
            delete: () => {},
          },
        },
      ],
    });
    service = TestBed.inject(GetTeamsUsecase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
