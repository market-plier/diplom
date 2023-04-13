import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './state';
import { AgendaCompositeKey } from '../api/contracts/enums';
import { Agenda } from '../api/contracts/agenda';

export const selectState = createFeatureSelector<State>('state');

export const selectAgendas = createSelector(selectState, (state) => {
  return state.agenda;
});

export const selectTemplateData = createSelector(selectState, (state) => {
  return state.templateData;
});

export const selectStaffData = createSelector(selectState, (state) => {
  return state.staff;
});

export const selectAgendasByKeys = createSelector(
  selectAgendas,
  selectTemplateData,
  (agendas, templateData) => {
    return agendas.reduce((acc, curr) => {
      const hasKey = templateData.agendaKeys?.some(
        (ak) =>
          ak.educationDegree === curr.educationDegree &&
          ak.entryBase === curr.entryBase &&
          ak.formOfEducation === curr.formOfEducation &&
          ak.keyword === curr.key &&
          ak.nationality === curr.nationality
      );
      if (hasKey) {
        acc.push(curr);
      }
      return acc;
    }, [] as Agenda[]);
  }
);

export const selectAgendaKeys = createSelector(selectAgendas, (agenda) => {
  return [...new Set(agenda.map((a) => a.key))];
});

export const selectStaffKeys = createSelector(selectStaffData, (staff) => {
  return [...new Set(staff.map((a) => a.subdivision))];
});
