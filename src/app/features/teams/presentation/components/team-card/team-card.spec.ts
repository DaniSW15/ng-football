import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamCard } from './team-card';
import { Team } from '../../../domain/team.model';

describe('TeamCard', () => {
  let component: TeamCard;
  let fixture: ComponentFixture<TeamCard>;

  const mockTeam: Team = {
    id: '11111111-1111-1111-1111-111111111111',
    name: 'Real Madrid CF',
    createdAt: '2026-11-25T01:00:00Z',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamCard],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamCard);
    fixture.componentRef.setInput('team', mockTeam);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and prefill rename model on startEdit', () => {
    expect(component).toBeTruthy();

    component.startEdit();
    expect(component.editing()).toBe(true);
    expect(component.renameModel()).toEqual({ name: 'Real Madrid CF' });
  });

  it('should emit delete only after inline confirmation', () => {
    const deleted: string[] = [];
    component.delete.subscribe((id) => deleted.push(id));

    component.startDelete();
    expect(component.confirmingDelete()).toBe(true);
    expect(deleted).toEqual([]);

    component.confirmDelete();
    expect(component.confirmingDelete()).toBe(false);
    expect(deleted).toEqual([mockTeam.id]);
  });
});
