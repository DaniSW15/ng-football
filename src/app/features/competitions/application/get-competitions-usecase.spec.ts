import { TestBed } from '@angular/core/testing';
import { GetCompetitionsUsecase } from './get-competitions-usecase';
import { CompetitionRepository } from '../domain/competition-repository';

describe('GetCompetitionsUsecase', () => {
  let service: GetCompetitionsUsecase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetCompetitionsUsecase,
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
    service = TestBed.inject(GetCompetitionsUsecase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
