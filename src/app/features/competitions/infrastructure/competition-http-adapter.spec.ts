import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CompetitionHttpAdapter } from './competition-http-adapter';

describe('CompetitionHttpAdapter', () => {
  let service: CompetitionHttpAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CompetitionHttpAdapter,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(CompetitionHttpAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
