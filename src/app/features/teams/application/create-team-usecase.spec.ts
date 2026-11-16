import { TestBed } from '@angular/core/testing';
import { CreateTeamUsecase } from './create-team-usecase';

describe('CreateTeamUsecase', () => {
  let service: CreateTeamUsecase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateTeamUsecase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
