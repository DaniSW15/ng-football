import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CompetitionsStore } from './competitions-store';
import { GetCompetitionsUsecase } from '../../application/get-competitions-usecase';
import { CreateCompetitionUsecase } from '../../application/create-competition-usecase';
import { DeleteCompetitionUsecase } from '../../application/delete-competition-usecase';
import { RenameCompetitionUsecase } from '../../application/rename-competition-usecase';

describe('CompetitionsStore', () => {
  let service: CompetitionsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CompetitionsStore,
        {
          provide: GetCompetitionsUsecase,
          useValue: { execute: () => of([]) },
        },
        {
          provide: CreateCompetitionUsecase,
          useValue: { execute: () => of() },
        },
        {
          provide: DeleteCompetitionUsecase,
          useValue: { execute: () => of() },
        },
        {
          provide: RenameCompetitionUsecase,
          useValue: { execute: () => of() },
        },
      ],
    });
    service = TestBed.inject(CompetitionsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
