import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TeamHttpAdapter } from './team-http-adapter';

describe('TeamHttpAdapter', () => {
  let service: TeamHttpAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TeamHttpAdapter,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(TeamHttpAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
