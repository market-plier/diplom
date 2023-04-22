import { createReducer, on } from '@ngrx/store';
import {
  AgendaApiActions,
  ApplicantDataActions,
  StaffDataActions,
  TemplateDataActions,
  TemplatesDataActions,
} from './actions';
import { State } from './state';

export const initialState: State = {
  agenda: [],
  applicants: [],
  staff: [],
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
  }),
  on(TemplatesDataActions.upsertTemplatesData, (_state, { templateData }) => {
    const newArray = [
      ...(_state.templatesData?.filter((t) => t.id !== templateData.id) ?? []),
    ];
    newArray.push(templateData);
    return Object.assign({}, _state, { templatesData: newArray });
  }),
  on(TemplatesDataActions.saveTemplatesData, (_state, { templatesData }) => {
    return Object.assign({}, _state, { templatesData });
  }),
  on(TemplatesDataActions.deleteTemplatesData, (_state, { templateData }) => {
    const newArray = [
      ...(_state.templatesData?.filter((t) => t.id !== templateData.id) ?? []),
    ];
    return Object.assign({}, _state, { templatesData: newArray });
  })
);
