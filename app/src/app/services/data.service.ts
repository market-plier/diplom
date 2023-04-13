import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Agenda } from '../api/contracts/agenda';
import { TemplateData } from '../api/contracts/templateData';
import { _agendaData } from '../data/agenda-data-map';
import { headerData, peopleData, protocolData } from '../data/test-data';
import { StaffDataActions, TemplateDataActions } from '../store/actions';
import { AgendaCompositeKey } from '../api/contracts/enums';
import { Staff } from '../api/contracts/staff';
import { selectState } from '../store/selectors';
import { State } from '../store/state';
import { staffData } from '../data/staff-data';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  allPeople = peopleData;
  state!: State;

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
    this.store.select(selectState).subscribe((value) => (this.state = value));
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

  updateTemplateData(templateData: TemplateData) {
    this.store.dispatch(
      TemplateDataActions.updateTemplateData({ templateData })
    );
  }

  updateStaffData(staff: Staff[]) {
    this.store.dispatch(StaffDataActions.updateStaffData({ staff }));
  }
}
