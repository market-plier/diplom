import { Injectable } from '@angular/core';
import { TemplateData } from '../api/contracts/templateData';
import {
  headerData,
  people,
  peopleData,
  protocolData,
} from '../data/test-data';
import { AgendaData } from '../data/enums';
import { pynkts } from '../data/agenda-data-map';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _templateData: TemplateData = {
    header: headerData,
    protocol: protocolData,
    agenda: [{}],
    decision: [{}],
  };

  allPeople = peopleData;

  get people() {
    return this.allPeople;
  }

  get templateData() {
    return this._templateData;
  }
  set templateData(value: TemplateData) {
    this._templateData = value;
  }

  constructor() {
    try {
      this._templateData = (JSON.parse(
        localStorage.getItem('documentData') ?? 'null'
      ) as TemplateData) ?? {
        header: headerData,
        protocol: protocolData,
        agenda: [{}],
        decision: [{}],
      };
    } catch (error) {
      localStorage.clear();
    }
  }

  getAgendaValue(agendaData: AgendaData) {
    return (
      pynkts.find(
        (agenda) =>
          agenda.keyword === agendaData.keyword &&
          agenda.educationDegree === agendaData.educationDegree &&
          agenda.entryBase === agendaData.entryBase &&
          agenda.formOfEducation === agendaData.formOfEducation &&
          agenda.nationality === agendaData.nationality
      )?.agendaText ?? 'Не знайдено'
    );
  }

  getDecisionValue(decisionData: AgendaData) {
    return (
      pynkts.find(
        (agenda) =>
          agenda.keyword === decisionData.keyword &&
          agenda.educationDegree === decisionData.educationDegree &&
          agenda.entryBase === decisionData.entryBase &&
          agenda.formOfEducation === decisionData.formOfEducation &&
          agenda.nationality === decisionData.nationality
      )?.decisionText ?? 'Не знайдено'
    );
  }
}
