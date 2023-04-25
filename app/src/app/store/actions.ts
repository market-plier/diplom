import { createActionGroup, props } from '@ngrx/store';
import { IAgenda } from '../api/contracts/agenda';
import { IApplicant } from '../api/contracts/applicant';
import { IStaff } from '../api/contracts/staff';
import { TemplateData } from '../api/contracts/template-data';

export const AgendaApiActions = createActionGroup({
  source: 'Data Service',
  events: {
    'Retrieved Agendas': props<{ agendas: IAgenda[] }>(),
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
    'Update Staff Data': props<{ staff: IStaff[] }>(),
  },
});

export const ApplicantDataActions = createActionGroup({
  source: 'Application',
  events: {
    'Update Applicant Data': props<{ applicants: IApplicant[] }>(),
  },
});

export const TemplatesDataActions = createActionGroup({
  source: 'Application',
  events: {
    'Save Templates Data': props<{ templatesData: TemplateData[] }>(),
    'Upsert Templates Data': props<{ templateData: TemplateData }>(),
    'Delete Templates Data': props<{ templateData: TemplateData }>(),
  },
});
