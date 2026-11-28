import { Component, ElementRef, input, signal, viewChild } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import {
  CreateSeasonFormModel,
  CreateSeasonPayload,
} from '@seasons/domain/season-model';
import { createSeasonSchema } from '@seasons/presentation/schemas/season.schema';

@Component({
  selector: 'app-season-form',
  standalone: true,
  imports: [FormField, FormRoot],
  templateUrl: './season-form.html',
  styleUrl: './season-form.scss',
})
export class SeasonForm {
  readonly competitionName = input<string | null>(null);
  readonly submitSeason =
    input.required<
      (payload: CreateSeasonPayload) => Promise<{ kind: string; message: string } | void>
    >();

  private readonly formElement =
    viewChild<ElementRef<HTMLFormElement>>('formEl');

  readonly seasonModel = signal<CreateSeasonFormModel>({
    name: '',
    startDate: '',
    endDate: '',
  });

  readonly seasonForm = form(this.seasonModel, createSeasonSchema, {
    submission: {
      action: async (field) => {
        const val = field().value();
        const payload: CreateSeasonPayload = {
          name: val.name.trim(),
          startDate: val.startDate,
          endDate: val.endDate,
        };

        const error = await this.submitSeason()(payload);
        if (!error) {
          this.seasonModel.set({
            name: '',
            startDate: '',
            endDate: '',
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
}
