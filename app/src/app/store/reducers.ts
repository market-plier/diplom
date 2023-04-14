import { createReducer, on } from '@ngrx/store';
import {
  AgendaApiActions,
  ApplicantDataActions,
  StaffDataActions,
  TemplateDataActions,
} from './actions';
import { State } from './state';

export const initialState: State = {
  agenda: [],
  applicants: [],
  staff: [],
  templateData: {},
};

export const stateReducer = createReducer(
  initialState,
  on(AgendaApiActions.retrievedAgendas, (_state, { agendas }) => {
    return Object.assign({}, _state, { agenda: agendas });
  }),
  on(TemplateDataActions.updateTemplateData, (_state, { templateData }) => {
    return Object.assign({}, _state, { templateData });
  }),
  on(StaffDataActions.updateStaffData, (_state, { staff }) => {
    return Object.assign({}, _state, { staff });
  }),
  on(ApplicantDataActions.updateApplicantData, (_state, { applicants }) => {
    return Object.assign({}, _state, { applicants });
  })
);