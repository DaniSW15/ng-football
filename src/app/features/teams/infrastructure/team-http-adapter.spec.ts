import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TeamHttpAdapter } from './team-http-adapter';

describe('TeamHttpAdapter', () => {
  let adapter: TeamHttpAdapter;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TeamHttpAdapter,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    adapter = TestBed.inject(TeamHttpAdapter);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(adapter).toBeTruthy();
  });

  it('should create a team via POST /teams and map DTO', () => {
    let result: unknown;
    adapter
      .create({ name: ' Real Madrid CF ' })
      .subscribe((res) => (result = res));

    const req = httpTesting.expectOne('/teams');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ name: 'Real Madrid CF' });

    req.flush({
      id: '11111111-1111-1111-1111-111111111111',
      name: 'Real Madrid CF',
      created_at: '2026-11-25T01:00:00Z',
    });

    expect(result).toEqual({
      id: '11111111-1111-1111-1111-111111111111',
      name: 'Real Madrid CF',
      createdAt: '2026-11-25T01:00:00Z',
    });
  });

  it('should list teams via GET /teams', () => {
    let result: unknown;
    adapter.getAll().subscribe((res) => (result = res));

    const req = httpTesting.expectOne('/teams');
    expect(req.request.method).toBe('GET');
    req.flush([
      {
        id: '11111111-1111-1111-1111-111111111111',
        name: 'Real Madrid CF',
        created_at: '2026-11-25T01:00:00Z',
      },
    ]);

    expect(result).toEqual([
      {
        id: '11111111-1111-1111-1111-111111111111',
        name: 'Real Madrid CF',
        createdAt: '2026-11-25T01:00:00Z',
      },
    ]);
  });

  it('should get a team by id via GET /teams/{id}', () => {
    let result: unknown;
    adapter
      .getById('11111111-1111-1111-1111-111111111111')
      .subscribe((res) => (result = res));

    const req = httpTesting.expectOne(
      '/teams/11111111-1111-1111-1111-111111111111'
    );
    expect(req.request.method).toBe('GET');
    req.flush({
      id: '11111111-1111-1111-1111-111111111111',
      name: 'Real Madrid CF',
      created_at: '2026-11-25T01:00:00Z',
    });

    expect(result).toEqual({
      id: '11111111-1111-1111-1111-111111111111',
      name: 'Real Madrid CF',
      createdAt: '2026-11-25T01:00:00Z',
    });
  });

  it('should rename a team via PATCH /teams/{id}', () => {
    let result: unknown;
    adapter
      .rename('11111111-1111-1111-1111-111111111111', {
        name: ' Nuevo Nombre ',
      })
      .subscribe((res) => (result = res));

    const req = httpTesting.expectOne(
      '/teams/11111111-1111-1111-1111-111111111111'
    );
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ name: 'Nuevo Nombre' });

    req.flush({
      id: '11111111-1111-1111-1111-111111111111',
      name: 'Nuevo Nombre',
      created_at: '2026-11-25T01:00:00Z',
    });

    expect(result).toEqual({
      id: '11111111-1111-1111-1111-111111111111',
      name: 'Nuevo Nombre',
      createdAt: '2026-11-25T01:00:00Z',
    });
  });

  it('should delete a team via DELETE /teams/{id}', () => {
    adapter.delete('11111111-1111-1111-1111-111111111111').subscribe();

    const req = httpTesting.expectOne(
      '/teams/11111111-1111-1111-1111-111111111111'
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(null, { status: 204, statusText: 'No Content' });
  });
});
