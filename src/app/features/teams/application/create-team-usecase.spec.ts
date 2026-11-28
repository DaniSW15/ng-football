import { TestBed } from '@angular/core/testing';
import { CreateTeamUsecase } from './create-team-usecase';
import { TeamRepository } from '@teams/domain/team-repository';

describe('CreateTeamUsecase', () => {
  let service: CreateTeamUsecase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CreateTeamUsecase,
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
    service = TestBed.inject(CreateTeamUsecase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
