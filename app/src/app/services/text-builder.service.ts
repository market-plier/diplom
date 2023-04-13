import { Injectable } from '@angular/core';
import { TemplateData } from '../api/contracts/templateData';
import {
  headerData,
  people,
  peopleData,
  protocolData,
} from '../data/test-data';
import { AgendaCompositeKey } from '../api/contracts/enums';
import { _agendaData } from '../data/agenda-data-map';
import { Store } from '@ngrx/store';
import { Agenda } from '../api/contracts/agenda';
import { questionsMap } from '../data/question-number-map';
import { Staff } from '../api/contracts/staff';

@Injectable({
  providedIn: 'root',
})
export class TextBuilderService {
  constructor(private store: Store) {}

  getDecisionValue(
    questionId: number,
    agendaData?: Agenda,
    heard?: Staff,
    speaker?: Staff
  ) {
    const questionNumberValue = questionsMap.find(
      (q) => q.id === questionId
    )?.value;

    if (agendaData?.key === 'Різне') {
      return `${questionNumberValue} - ${agendaData.decisionType}`;
    }

    const heardValue = `${
      questionNumberValue
        ? questionNumberValue.concat(
            ` слухали ${
              heard?.position_r.concat(' ', heard?.fullName_r) ?? 'Не знайдено'
            } \n`
          )
        : ''
    }`;
    const speakerValue = `Виступив: ${
      speaker?.position.concat(' ', speaker.fullName) ?? 'Не знайдено'
    }\n`;
    return `${heardValue}${speakerValue}${
      agendaData?.decisionType ?? 'Не знайдено'
    }`;
  }

  getAgendaValue(questionId: number, agendaData?: Agenda) {
    console.log(agendaData);

    return `${agendaData?.agendaType ?? 'Не знайдено'}`;
  }
}
