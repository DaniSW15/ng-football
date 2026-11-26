import { Component, ElementRef, input, signal, viewChild } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { Team } from '@features/teams/domain/team.model';
import {
  EnrollTeamFormModel,
  EnrollTeamPayload,
} from '../../../domain/season-model';
import { enrollTeamSchema } from '../../schemas/season.schema';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [FormField, FormRoot],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.scss',
})
export class EnrollmentForm {
  readonly teams = input.required<Team[]>();
  readonly enrolledTeamIds = input<ReadonlySet<string>>(new Set());
  readonly submitEnrollment =
    input.required<
      (payload: EnrollTeamPayload) => Promise<{ kind: string; message: string } | void>
    >();

  private readonly formElement =
    viewChild<ElementRef<HTMLFormElement>>('formEl');

  readonly enrollmentModel = signal<EnrollTeamFormModel>({
    teamId: '',
    groupName: '',
  });

  readonly enrollmentForm = form(this.enrollmentModel, enrollTeamSchema, {
    submission: {
      action: async (field) => {
        const val = field().value();
        const trimmedGroup = val.groupName.trim();
        const payload: EnrollTeamPayload = {
          teamId: val.teamId,
          groupName: trimmedGroup.length > 0 ? trimmedGroup : null,
        };

        const error = await this.submitEnrollment()(payload);
        if (!error) {
          this.enrollmentModel.set({
            teamId: '',
            groupName: '',
          });
          field().reset();
        }
        return error;
      },
      onInvalid: () => {
        queueMicrotask(() => {
          const firstInvalid = this.formElement()?.nativeElement.querySelector<
            HTMLElement
          >('[aria-invalid="true"]');
          firstInvalid?.focus();
        });
      },
    },
  });

  isAlreadyEnrolled(teamId: string): boolean {
    return this.enrolledTeamIds().has(teamId);
  }
}
