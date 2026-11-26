import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { SeasonHttpAdapter } from './season-http-adapter';

describe('SeasonHttpAdapter', () => {
  let adapter: SeasonHttpAdapter;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SeasonHttpAdapter,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    adapter = TestBed.inject(SeasonHttpAdapter);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(adapter).toBeTruthy();
  });

  it('should create a season via POST /competitions/{id}/seasons and map DTOs', () => {
    let result: unknown;
    adapter
      .create('22222222-2222-2222-2222-222222222222', {
        name: ' 2025/2026 ',
        startDate: '2025-08-15',
        endDate: '2026-05-30',
      })
      .subscribe((res) => (result = res));

    const req = httpTesting.expectOne(
      '/competitions/22222222-2222-2222-2222-222222222222/seasons'
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      name: '2025/2026',
      start_date: '2025-08-15',
      end_date: '2026-05-30',
    });

    req.flush({
      id: 'a7d846ec-314c-480f-9101-9b270efc89b1',
      competition_id: '22222222-2222-2222-2222-222222222222',
      name: '2025/2026',
      start_date: '2025-08-15',
      end_date: '2026-05-30',
      status: 'draft',
      created_at: '2026-11-25T01:00:00Z',
    });

    expect(result).toEqual({
      id: 'a7d846ec-314c-480f-9101-9b270efc89b1',
      competitionId: '22222222-2222-2222-2222-222222222222',
      name: '2025/2026',
      startDate: '2025-08-15',
      endDate: '2026-05-30',
      status: 'draft',
      createdAt: '2026-11-25T01:00:00Z',
    });
  });

  it('should list seasons for a competition via GET /competitions/{id}/seasons', () => {
    let result: unknown;
    adapter
      .getByCompetition('22222222-2222-2222-2222-222222222222')
      .subscribe((res) => (result = res));

    const req = httpTesting.expectOne(
      '/competitions/22222222-2222-2222-2222-222222222222/seasons'
    );
    expect(req.request.method).toBe('GET');
    req.flush([
      {
        id: 'a7d846ec-314c-480f-9101-9b270efc89b1',
        competition_id: '22222222-2222-2222-2222-222222222222',
        name: '2025/2026',
        start_date: '2025-08-15',
        end_date: '2026-05-30',
        status: 'draft',
        created_at: '2026-11-25T01:00:00Z',
      },
    ]);

    expect(result).toEqual([
      {
        id: 'a7d846ec-314c-480f-9101-9b270efc89b1',
        competitionId: '22222222-2222-2222-2222-222222222222',
        name: '2025/2026',
        startDate: '2025-08-15',
        endDate: '2026-05-30',
        status: 'draft',
        createdAt: '2026-11-25T01:00:00Z',
      },
    ]);
  });

  it('should get a season by id via GET /seasons/{id}', () => {
    let result: unknown;
    adapter
      .getById('a7d846ec-314c-480f-9101-9b270efc89b1')
      .subscribe((res) => (result = res));

    const req = httpTesting.expectOne(
      '/seasons/a7d846ec-314c-480f-9101-9b270efc89b1'
    );
    expect(req.request.method).toBe('GET');
    req.flush({
      id: 'a7d846ec-314c-480f-9101-9b270efc89b1',
      competition_id: '22222222-2222-2222-2222-222222222222',
      name: '2025/2026',
      start_date: '2025-08-15',
      end_date: '2026-05-30',
      status: 'active',
      created_at: '2026-11-25T01:00:00Z',
    });

    expect(result).toMatchObject({
      id: 'a7d846ec-314c-480f-9101-9b270efc89b1',
      status: 'active',
    });
  });

  it('should activate a season via POST /seasons/{id}/activate with empty body', () => {
    let result: unknown;
    adapter
      .activate('a7d846ec-314c-480f-9101-9b270efc89b1')
      .subscribe((res) => (result = res));

    const req = httpTesting.expectOne(
      '/seasons/a7d846ec-314c-480f-9101-9b270efc89b1/activate'
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBeNull();
    req.flush({
      id: 'a7d846ec-314c-480f-9101-9b270efc89b1',
      competition_id: '22222222-2222-2222-2222-222222222222',
      name: '2025/2026',
      start_date: '2025-08-15',
      end_date: '2026-05-30',
      status: 'active',
      created_at: '2026-11-25T01:00:00Z',
    });

    expect(result).toMatchObject({ status: 'active' });
  });

  it('should enroll a team via POST /seasons/{id}/enrollments and normalize blank groupName', () => {
    let result: unknown;
    adapter
      .enrollTeam('a7d846ec-314c-480f-9101-9b270efc89b1', {
        teamId: '11111111-1111-1111-1111-111111111111',
        groupName: '   ',
      })
      .subscribe((res) => (result = res));

    const req = httpTesting.expectOne(
      '/seasons/a7d846ec-314c-480f-9101-9b270efc89b1/enrollments'
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      team_id: '11111111-1111-1111-1111-111111111111',
      group_name: null,
    });

    req.flush({
      id: '33333333-3333-3333-3333-333333333333',
      season_id: 'a7d846ec-314c-480f-9101-9b270efc89b1',
      team_id: '11111111-1111-1111-1111-111111111111',
      group_name: null,
      created_at: '2026-11-25T01:00:00Z',
    });

    expect(result).toEqual({
      id: '33333333-3333-3333-3333-333333333333',
      seasonId: 'a7d846ec-314c-480f-9101-9b270efc89b1',
      teamId: '11111111-1111-1111-1111-111111111111',
      groupName: null,
      createdAt: '2026-11-25T01:00:00Z',
    });
  });

  it('should list enrollments via GET /seasons/{id}/enrollments', () => {
    let result: unknown;
    adapter
      .getEnrollments('a7d846ec-314c-480f-9101-9b270efc89b1')
      .subscribe((res) => (result = res));

    const req = httpTesting.expectOne(
      '/seasons/a7d846ec-314c-480f-9101-9b270efc89b1/enrollments'
    );
    expect(req.request.method).toBe('GET');
    req.flush([
      {
        id: '33333333-3333-3333-3333-333333333333',
        season_id: 'a7d846ec-314c-480f-9101-9b270efc89b1',
        team_id: '11111111-1111-1111-1111-111111111111',
        group_name: 'Grupo A',
        created_at: '2026-11-25T01:00:00Z',
      },
    ]);

    expect(result).toEqual([
      {
        id: '33333333-3333-3333-3333-333333333333',
        seasonId: 'a7d846ec-314c-480f-9101-9b270efc89b1',
        teamId: '11111111-1111-1111-1111-111111111111',
        groupName: 'Grupo A',
        createdAt: '2026-11-25T01:00:00Z',
      },
    ]);
  });
});
