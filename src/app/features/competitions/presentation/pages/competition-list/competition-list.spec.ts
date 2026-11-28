import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { CompetitionListPage } from './competition-list';
import { CompetitionsStore } from '@competitions/presentation/state/competitions-store';

describe('CompetitionListPage', () => {
  let component: CompetitionListPage;
  let fixture: ComponentFixture<CompetitionListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionListPage],
      providers: [
        {
          provide: CompetitionsStore,
          useValue: {
            competitions: signal([]),
            competitionCount: signal(0),
            isLoading: signal(false),
            error: signal(null),
            loadCompetitions: () => {},
            createCompetition: () => {},
            deleteCompetition: () => {},
            renameCompetition: () => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CompetitionListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
