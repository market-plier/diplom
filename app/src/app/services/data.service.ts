import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AgendaCompositeKey, IAgenda } from '../api/contracts/agenda';
import { Applicant, IApplicant } from '../api/contracts/applicant';
import { IStaff } from '../api/contracts/staff';
import { TemplateData } from '../api/contracts/template-data';
import { _agendaData } from '../data/agenda-data-map';
import { ApplicantsData } from '../data/applicants-data';
import { staffData } from '../data/staff-data';
import {
  AgendaApiActions,
  ApplicantDataActions,
  StaffDataActions,
  TemplateDataActions,
  TemplatesDataActions,
} from '../store/actions';
import { selectApplicants, selectState } from '../store/selectors';
import { State } from '../store/state';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  state!: State;
  applicants!: Applicant[];

  constructor(private store: Store) {
    try {
      let templates = this.getTemplatesData();
      if (templates) {
        this.store.dispatch(
          TemplatesDataActions.saveTemplatesData({ templatesData: templates })
        );
      }
    } catch (error) {
      localStorage.clear();
    }
    this.updateApplicantsData(ApplicantsData);
    this.store.select(selectState).subscribe((value) => (this.state = value));
    this.store
      .select(selectApplicants)
      .subscribe((value) => (this.applicants = value));
  }

  upsertTemplate(templateData: TemplateData) {
    const templatesString = localStorage.getItem('templatesData');
    if (templatesString) {
      try {
        const tempData = JSON.parse(templatesString) as TemplateData[];
        const templateToUpdate = tempData.find((t) => t.id === templateData.id);
        if (templateToUpdate) {
          Object.assign(templateToUpdate, templateData);
          this.store.dispatch(
            TemplatesDataActions.upsertTemplatesData({
              templateData: templateToUpdate,
            })
          );
        } else {
          tempData.push(templateData);
          templateData.id = Math.max(...tempData.map((t) => t.id ?? 1)) + 1;
          this.store.dispatch(
            TemplatesDataActions.upsertTemplatesData({ templateData })
          );
        }
        const tempDataString = JSON.stringify(tempData);
        localStorage.setItem('templatesData', tempDataString);
        return templateData;
      } catch (error) {
        templateData.id = 1;
        const templates = JSON.stringify([templateData]);
        localStorage.setItem('templatesData', templates);
      }
    } else {
      templateData.id = 1;
      const templates = JSON.stringify([templateData]);
      localStorage.setItem('templatesData', templates);
    }
    this.store.dispatch(
      TemplatesDataActions.upsertTemplatesData({ templateData })
    );
    return templateData;
  }

  deleteTemplate(template: TemplateData) {
    const templatesString = localStorage.getItem('templatesData');
    if (templatesString) {
      try {
        const tempData = JSON.parse(templatesString) as TemplateData[];

        const tempDataString = JSON.stringify(
          tempData.filter((t) => t.id !== template.id)
        );
        localStorage.setItem('templatesData', tempDataString);
      } catch (error) {}
    } else {
    }
    this.store.dispatch(
      TemplatesDataActions.deleteTemplatesData({ templateData: template })
    );
  }

  getTemplateDataById(id: number) {
    const templates = localStorage.getItem('templatesData');
    let template: TemplateData | undefined;
    if (templates) {
      try {
        const tempData = JSON.parse(templates) as TemplateData[];
        template = tempData.find((t) => t.id === id) ?? {};
      } catch (error) {}
    } else {
    }
    this.updateTemplateData(template ?? {});
    return template;
  }

  getTemplatesData() {
    const templates = localStorage.getItem('templatesData');
    let tempData: TemplateData[] | undefined;
    if (templates) {
      try {
        tempData = JSON.parse(templates) as TemplateData[];
      } catch (error) {}
    }
    return tempData;
  }

  getAgenda() {
    const agendas = localStorage.getItem('agendaData');
    let agendaData: IAgenda[];
    if (!agendas) {
      localStorage.setItem('agendaData', JSON.stringify(_agendaData));
    }
    try {
      const agendas = localStorage.getItem('agendaData')!;
      agendaData = JSON.parse(agendas) as IAgenda[];
    } catch (error) {
      agendaData = _agendaData;
    }
    return of(agendaData);
  }

  getStaffData() {
    const staff = localStorage.getItem('staffData');
    let staffDatas: IStaff[];
    if (!staff) {
      localStorage.setItem('staffData', JSON.stringify(staffData));
    }
    try {
      const staff = localStorage.getItem('staffData')!;
      staffDatas = JSON.parse(staff) as IStaff[];
    } catch (error) {
      staffDatas = staffData;
    }
    return of(staffDatas);
  }

  getStaffByKey(subdivision: string) {
    return this.state.staff.find((s) => s.subdivision === subdivision);
  }

  getAgendaByKey(ak?: AgendaCompositeKey) {
    const agenda = Object.assign(
      {},
      this.state.agenda?.find(
        (a) =>
          ak?.educationDegree === a.keyEducationDegree &&
          ak.entryBase === a.keyEntryBase &&
          ak.formOfEducation === a.keyFormOfEducation &&
          ak.keyword === a.keyword &&
          ak.nationality === a.keyNationality
      )
    );
    if (agenda) {
      agenda.part3 = ak?.agendaAddition ?? '';
    }
    return agenda;
  }

  getApplicantsByKey(ak?: AgendaCompositeKey) {
    return this.applicants.filter(
      (a) =>
        ak?.educationDegree === a.getEducationDegree() &&
        ak?.entryBase === a.getEntryBase() &&
        ak?.nationality === a.getNationality()
    );
  }

  getApplicantByFullName(name: string) {
    return this.applicants.find((a) => a.applicant.fullName === name);
  }

  updateTemplateData(templateData: TemplateData) {
    this.store.dispatch(
      TemplateDataActions.updateTemplateData({ templateData })
    );
  }

  updateStaffData(staff: IStaff[]) {
    localStorage.setItem('staffData', JSON.stringify(staff));
    this.store.dispatch(StaffDataActions.updateStaffData({ staff }));
  }

  updateApplicantsData(applicants: IApplicant[]) {
    this.store.dispatch(
      ApplicantDataActions.updateApplicantData({ applicants })
    );
  }

  updateAgendaData(agendas: IAgenda[]) {
    localStorage.setItem('agendaData', JSON.stringify(agendas));
    this.store.dispatch(AgendaApiActions.retrievedAgendas({ agendas }));
  }
}
