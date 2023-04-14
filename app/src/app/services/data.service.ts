import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AgendaCompositeKey } from '../api/contracts/agenda';
import { Applicant, IApplicant } from '../api/contracts/applicant';
import { Staff } from '../api/contracts/staff';
import { TemplateData } from '../api/contracts/templateData';
import { _agendaData } from '../data/agenda-data-map';
import { ApplicantsData } from '../data/applicants-data';
import { staffData } from '../data/staff-data';
import { headerData, peopleData, protocolData } from '../data/test-data';
import {
  ApplicantDataActions,
  StaffDataActions,
  TemplateDataActions,
} from '../store/actions';
import { selectApplicants, selectState } from '../store/selectors';
import { State } from '../store/state';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  allPeople = peopleData;
  state!: State;
  applicants!: Applicant[];

  get people() {
    return this.allPeople;
  }

  constructor(private store: Store) {
    try {
      const templateData = (JSON.parse(
        localStorage.getItem('documentData') ?? 'null'
      ) as TemplateData) ?? {
        header: headerData,
        protocol: protocolData,
        agendaKeys: [{}],
        decision: [{}],
      };
      this.updateTemplateData(templateData);
    } catch (error) {
      localStorage.clear();
    }
    this.updateStaffData(staffData);
    this.updateApplicantsData(ApplicantsData);
    this.store.select(selectState).subscribe((value) => (this.state = value));
    this.store
      .select(selectApplicants)
      .subscribe((value) => (this.applicants = value));
  }

  getAgenda() {
    return of(_agendaData);
  }

  getStaffByKey(subdivision: string) {
    return this.state.staff.find((s) => s.subdivision === subdivision);
  }

  getAgendaByKey(ak?: AgendaCompositeKey) {
    return this.state.agenda?.find(
      (a) =>
        ak?.educationDegree === a.educationDegree &&
        ak.entryBase === a.entryBase &&
        ak.formOfEducation === a.formOfEducation &&
        ak.keyword === a.key &&
        ak.nationality === a.nationality
    );
  }

  getApplicantsByKey(ak?: AgendaCompositeKey) {
    return this.applicants.filter(
      (a) =>
        ak?.educationDegree === a.getEducationDegree() &&
        ak?.entryBase === a.getEntryBase() &&
        ak?.nationality === a.getNationality()
    );
  }

  updateTemplateData(templateData: TemplateData) {
    this.store.dispatch(
      TemplateDataActions.updateTemplateData({ templateData })
    );
  }

  updateStaffData(staff: Staff[]) {
    this.store.dispatch(StaffDataActions.updateStaffData({ staff }));
  }

  updateApplicantsData(applicants: IApplicant[]) {
    this.store.dispatch(
      ApplicantDataActions.updateApplicantData({ applicants })
    );
  }
}
