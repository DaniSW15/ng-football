import { Component, output, signal } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import {
  CreateCompetitionPayload,
  CreateCompetitionFormModel,
} from '../../../domain/competition-model';
import { competitionSchema } from '../../schemas/competition.schema';

@Component({
  selector: 'app-competition-form',
  standalone: true,
  imports: [FormField, FormRoot],
  templateUrl: './competition-form.html',
  styleUrl: './competition-form.scss',
})
export class CompetitionForm {
  readonly competitionCreated = output<CreateCompetitionPayload>();

  readonly competitionModel = signal<CreateCompetitionFormModel>({
    name: '',
    competitionType: 'league',
    scope: 'domestic',
    countryCode: '',
  });

  readonly competitionForm = form(this.competitionModel, competitionSchema, {
    submission: {
      action: async (model) => {
        const val = model().value();
        const payload: CreateCompetitionPayload = {
          name: val.name.trim(),
          competitionType: val.competitionType,
          scope: val.scope,
          countryCode:
            val.scope === 'domestic'
              ? val.countryCode.trim().toUpperCase() || null
              : null,
        };
        this.competitionCreated.emit(payload);
        this.competitionModel.set({
          name: '',
          competitionType: 'league',
          scope: 'domestic',
          countryCode: '',
        });
      },
    },
  });
}
