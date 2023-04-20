import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Agenda } from '../api/contracts/agenda';
import { Applicant } from '../api/contracts/applicant';
import { State } from './state';

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

export const selectApplicants = createSelector(selectState, (state) => {
  return state.applicants.map((ap) => new Applicant(ap));
});

export const secelctAvailableApplicants = createSelector(
  selectApplicants,
  selectTemplateData,
  (applicants, templateData) => {
    return applicants.filter(
      (a) => a.getEducationDegree() === templateData.agendaKeys
    );
  }
);

export const selectAgendasByKeys = createSelector(
  selectAgendas,
  selectTemplateData,
  (agendas, templateData) => {
    return agendas.reduce((acc, curr) => {
      const hasKey = templateData.agendaKeys?.some(
        (ak) =>
          ak.educationDegree === curr.keyEducationDegree &&
          ak.entryBase === curr.keyEntryBase &&
          ak.formOfEducation === curr.keyFormOfEducation &&
          ak.keyword === curr.keyword &&
          ak.nationality === curr.keyNationality
      );
      if (hasKey) {
        acc.push(curr);
      }
      return acc;
    }, [] as Agenda[]);
  }
);

export const selectAgendaKeys = createSelector(selectAgendas, (agenda) => {
  return [...new Set(agenda.map((a) => a.keyword))];
});

export const selectStaffKeys = createSelector(selectStaffData, (staff) => {
  return [...new Set(staff.map((a) => a.subdivision))];
});

export const selectStaffResolutions = createSelector(
  selectStaffData,
  (staff) => {
    return [...new Set(staff.map((a) => a.positionGenitive))];
  }
);
