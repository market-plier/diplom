import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Agenda } from '../api/contracts/agenda';
import { Applicant } from '../api/contracts/applicant';
import { GenderSelectMap } from '../api/contracts/enums';
import { Staff } from '../api/contracts/staff';
import { questionsMap } from '../data/question-number-map';
import { staffData } from '../data/staff-data';

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

  getTextPart4(
    agenda: Agenda,
    applicant: Applicant,
    source: string,
    resolution: string
  ) {
    return agenda.key === 'Зміна фінансування' ||
      agenda.key == 'Зміна фінансування кк4' ||
      agenda.key == 'Зміна фінансування кк5' ||
      agenda.key == 'Зміна фінансування кк6' ||
      agenda.key == 'Зміна фінансування кк7' ||
      agenda.key ==
        'Зміна фінансування серед зарахованих на контракт за рейтингом' ||
      agenda.key == 'Зміна фінансування серед пільгових категорій'
      ? (addition == '' ? '' : addition + ' ') +
          applicant.applicant.fullName +
          ', IDe - ' +
          applicant.applicant.idCard +
          ', ' +
          (applicant.getEducationDegree() == 'Phd'
            ? GenderSelectMap[applicant.getGender()].asp
            : GenderSelectMap[applicant.getGender()].stud) +
          ' ' +
          applicant.applicant.course +
          '-го курсу, ' +
          applicant.getFullEDucationForm() +
          (agenda.key == 'Зміна фінансування' ||
          agenda.key == 'Зміна фінансування кк4' ||
          agenda.key == 'Зміна фінансування кк5' ||
          agenda.key == 'Зміна фінансування кк6' ||
          agenda.key == 'Зміна фінансування кк7' ||
          agenda.key ==
            'Зміна фінансування серед зарахованих на контракт за рейтингом' ||
          agenda.key == 'Зміна фінансування серед пільгових категорій'
            ? ''
            : ', ') +
          (agenda.key == 'Зміна фінансування' ||
          agenda.key == 'Зміна фінансування кк4' ||
          agenda.key == 'Зміна фінансування кк5' ||
          agenda.key == 'Зміна фінансування кк6' ||
          agenda.key == 'Зміна фінансування кк7' ||
          agenda.key ==
            'Зміна фінансування серед зарахованих на контракт за рейтингом' ||
          agenda.key == 'Зміна фінансування серед пільгових категорій'
            ? ''
            : applicant.getFullSourceOfFunding()) +
          ', ' +
          (applicant.getEducationDegree() == 'Phd'
            ? applicant.getFacultyFullName2022()
            : applicant.getFacultyFullNameR()) +
          (!applicant.applicant.group.length ? ', ' : ' гр. ') +
          (!applicant.applicant.group.length
            ? ''
            : applicant.applicant.group + ', ') +
          (applicant.getEducationDegree() == 'Phd'
            ? ''
            : applicant.getEducationDegreeR()) +
          ' на базі ' +
          (applicant.getEducationDegree() == 'Phd'
            ? applicant.getEntryBaseStup() + ','
            : applicant.getEntryBaseFullR()) +
          ' за спеціальністю «' +
          (!applicant.applicant.idEducationProgram.length
            ? applicant.applicant.specialty
            : applicant.getEducationProgramSpecialty()) +
          '», ' +
          (applicant.getSpecialtyNumbers() == '035' ||
          applicant.getSpecialtyNumbers() == '022' ||
          applicant.getSpecialtyNumbers() == '014'
            ? 'спеціалізація «' +
              applicant.getEducationProgramSpecialty() +
              '», '
            : ' ') +
          (applicant.getEducationDegree() == 'Phd'
            ? 'освітня програма «' + applicant.getEducationProgramSpecialty()
            : agenda.key == 'Зміна фінансування' ||
              agenda.key == 'Зміна фінансування кк4' ||
              agenda.key == 'Зміна фінансування кк5' ||
              agenda.key == 'Зміна фінансування кк6' ||
              agenda.key == 'Зміна фінансування кк7' ||
              agenda.key ==
                'Зміна фінансування серед зарахованих на контракт за рейтингом' ||
              agenda.key == 'Зміна фінансування серед пільгових категорій'
            ? !applicant.applicant.idEducationProgram.length
              ? 'з подальшим розподілом на одну з освітніх програм «' +
                applicant.getKpOsvintiProgrami() +
                '»'
              : ' освітня програма «' +
                applicant.getEducationProgramSpecialty() +
                '»'
            : applicant.applicant.idEducationProgram.length
            ? 'з освітньої програми «' +
              applicant.getKpOsvintiProgrami() +
              '» на освітню програму «' +
              applicant.getEducationProgramSpecialty() +
              '»' +
              applicant.getEducationProgramSpecialty() +
              (source == ''
                ? '.'
                : '. ' +
                  (agenda.key == 'Зміна фінансування' ||
                  agenda.key == 'Зміна фінансування кк4' ||
                  agenda.key == 'Зміна фінансування кк5' ||
                  agenda.key == 'Зміна фінансування кк6' ||
                  agenda.key == 'Зміна фінансування серед пільгових категорій'
                    ? 'Підстава: ' + source + '.'
                    : 'Підстава: заява ст.' +
                      applicant.getFullNameR() +
                      '. ' +
                      ' резолюція ' +
                      resolution +
                      ' ' +
                      this.getResolutionStaffNameRByResolution(resolution) +
                      '.'))
            : '')
      : '';
  }

  getResolutionStaffNameRByResolution(resolution: string) {
    return staffData.find((s) => s.position_r === resolution)?.fullName_r;
  }
}
