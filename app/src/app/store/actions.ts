import { createActionGroup, props } from '@ngrx/store';
import { Agenda } from '../api/contracts/agenda';
import { IApplicant } from '../api/contracts/applicant';
import { Staff } from '../api/contracts/staff';
import { TemplateData } from '../api/contracts/templateData';

export const AgendaApiActions = createActionGroup({
  source: 'Data Service',
  events: {
    'Retrieved Agendas': props<{ agendas: Agenda[] }>(),
  },
});

export const TemplateDataActions = createActionGroup({
  source: 'Application',
  events: {
    'Update Template Data': props<{ templateData: TemplateData }>(),
  },
});

export const StaffDataActions = createActionGroup({
  source: 'Application',
  events: {
    'Update Staff Data': props<{ staff: Staff[] }>(),
  },
});

export const ApplicantDataActions = createActionGroup({
  source: 'Application',
  events: {
    'Update Applicant Data': props<{ applicants: IApplicant[] }>(),
  },
});
