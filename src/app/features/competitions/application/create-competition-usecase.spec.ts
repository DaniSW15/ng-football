import { TestBed } from '@angular/core/testing';
import { CreateCompetitionUsecase } from './create-competition-usecase';
import { CompetitionRepository } from '../domain/competition-repository';

describe('CreateCompetitionUsecase', () => {
  let service: CreateCompetitionUsecase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CreateCompetitionUsecase,
        {
          provide: CompetitionRepository,
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
    service = TestBed.inject(CreateCompetitionUsecase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
