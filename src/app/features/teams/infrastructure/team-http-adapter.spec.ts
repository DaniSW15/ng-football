import { TestBed } from '@angular/core/testing';
import { TeamHttpAdapter } from './team-http-adapter';

describe('TeamHttpAdapter', () => {
  let service: TeamHttpAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamHttpAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
