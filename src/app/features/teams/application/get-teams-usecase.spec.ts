import { TestBed } from '@angular/core/testing';
import { GetTeamsUsecase } from './get-teams-usecase';

describe('GetTeamsUsecase', () => {
  let service: GetTeamsUsecase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTeamsUsecase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
