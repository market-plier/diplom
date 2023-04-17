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
    agendaData: Agenda,
    heard?: Staff,
    speaker?: Staff,
    applicantPoints?: {
      applicant?: Applicant;
      source: string;
      resolution: string;
      addition: string;
      zavKurs: string;
      previousEducationalEstablishment: string;
    }[]
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

    const applicantText = applicantPoints?.map((ap) => {
      if (ap.applicant) {
        return (
          this.getApplicantText(
            agendaData,
            ap.applicant,
            ap.source,
            ap.resolution,
            ap.addition,
            ap.zavKurs,
            ap.previousEducationalEstablishment
          ) + '\n'
        );
      } else {
        return '';
      }
    });

    return `${heardValue}${speakerValue}${
      this.getDecisionText(agendaData) ?? 'Не знайдено'
    }\n${applicantText}`;
  }
  getDecisionText(agendaData: Agenda) {
    return `${agendaData.decisionType}${agendaData.part2}${agendaData.part3}`;
  }

  getAgendaValue(questionId: number, agendaData?: Agenda) {
    return `${agendaData?.agendaType ?? 'Не знайдено'}`;
  }

  getApplicantText(
    agenda: Agenda,
    applicant: Applicant,
    source: string,
    resolution: string,
    addition: string,
    zavKurs: string,
    previousEducationalEstablishment: string
  ): string {
    return agenda.key === 'Зміна фінансування' ||
      agenda.key == 'Зміна фінансування кк4' ||
      agenda.key == 'Зміна фінансування кк5' ||
      agenda.key == 'Зміна фінансування кк6' ||
      agenda.key ==
        'Зміна фінансування серед зарахованих на контракт за рейтингом' ||
      agenda.key == 'Зміна фінансування серед пільгових категорій'
      ? this.getTextPart5(
          agenda,
          applicant,
          source,
          resolution,
          addition,
          zavKurs,
          previousEducationalEstablishment
        )
      : agenda.key == 'Переведення на освітню програму'
      ? this.getTextPart4(
          agenda,
          applicant,
          source,
          resolution,
          addition,
          zavKurs,
          previousEducationalEstablishment
        )
      : agenda.key == 'Відраховані за власним бажанням' ||
        agenda.key == 'Відраховані, що без оплати' ||
        agenda.key == 'Відраховані, що не уклали договір про навчання'
      ? this.getTextPart3(
          agenda,
          applicant,
          source,
          resolution,
          addition,
          zavKurs,
          previousEducationalEstablishment
        )
      : agenda.key == 'Поновлені з нашого ЗВО' ||
        agenda.key == 'Поновлені з іншого ЗВО' ||
        agenda.key == 'Поновлені з іншого ЗВО НУ' ||
        agenda.key == 'Поновлені з нашого ЗВО НУ'
      ? this.getTextPart2(
          agenda,
          applicant,
          source,
          resolution,
          addition,
          zavKurs,
          previousEducationalEstablishment
        )
      : this.getTextPart1(
          agenda,
          applicant,
          source,
          resolution,
          addition,
          zavKurs,
          previousEducationalEstablishment
        );
  }

  getTextPart1(
    agenda: Agenda,
    applicant: Applicant,
    source: string,
    resolution: string,
    addition: string,
    zavKurs: string,
    previousEducationalEstablishment: string
  ): string {
    return agenda.key + applicant.getNationality() ===
      'Зараховані контрактІН' ||
      agenda.key + applicant.getNationality() == 'Допуск до конкурсуІН' ||
      agenda.key + applicant.getNationality() == 'Допуск до конкурсуУКР' ||
      agenda.key == 'Поновлені для завершення атестації'
      ? agenda.key + applicant.getNationality() == 'Зараховані контрактІН'
        ? addition +
          ' ' +
          applicant.applicant.fullName +
          ' до ' +
          applicant.getFacultyFullNameR()
        : agenda.key + applicant.getNationality() == 'Допуск до конкурсуІН' ||
          agenda.key + applicant.getNationality() == 'Допуск до конкурсуУКР'
        ? addition +
          ' ' +
          applicant.applicant.fullName +
          ', як так' +
          GenderSelectMap[applicant.getGender()].ogo_u +
          ', як' +
          GenderSelectMap[applicant.getGender()].iy_a +
          ' викон' +
          GenderSelectMap[applicant.getGender()].av_ala +
          ' доконкурсні процедури'
        : applicant.applicant.fullName +
          ', ' +
          GenderSelectMap[applicant.getGender()].stud +
          ' ' +
          applicant.applicant.course +
          ' курсу ' +
          applicant.getFacultyFullNameR() +
          ' гр. ' +
          applicant.applicant.group +
          ' ' +
          applicant.getEducationDegreeR() +
          ' за спеціальністю ' +
          applicant.getEducationProgramSpecialty() +
          ' (освітня програма «' +
          applicant.getEducationProgramName() +
          '»), ' +
          applicant.getFacultyFormFull2021() +
          ', для захисту дипломної роботи. \nПідстава: заява ст. ' +
          applicant.getFullNameR() +
          ' згода ' +
          applicant.getPKFaculty() +
          ' ' +
          applicant.getFaculty() +
          ' резолюція\n\t' +
          resolution +
          ' ' +
          this.getResolutionStaffNameRByResolution(resolution) +
          '.'
      : '';
  }

  getTextPart2(
    agenda: Agenda,
    applicant: Applicant,
    source: string,
    resolution: string,
    addition: string,
    zavKurs: string,
    previousEducationalEstablishment: string
  ): string {
    return agenda.key === 'Поновлені з нашого ЗВО' ||
      agenda.key == 'Поновлені з іншого ЗВО' ||
      agenda.key == 'Поновлені з іншого ЗВО НУ' ||
      agenda.key == 'Поновлені з нашого ЗВО НУ'
      ? applicant.applicant.fullName +
          ' на ' +
          applicant.applicant.fullName +
          'й курс ' +
          ' ' +
          applicant.getEducationProgramName() +
          ', ' +
          applicant.getFacultyFullName2022() +
          ', ' +
          applicant.getFacultyFullNameR() +
          ' до групи ' +
          applicant.applicant.group +
          ' за спеціальністю ' +
          applicant.getEducationProgramSpecialty() +
          ', ' +
          ' (освітня програма «' +
          applicant.getEducationProgramName +
          '»), ' +
          applicant.getFinFull() +
          ', як такого, що закінчив ' +
          zavKurs +
          ' курс ' +
          previousEducationalEstablishment +
          '. Дата закінчення навчання ' +
          applicant.applicant.educationEndDate +
          ' р. Підстава: заява ст. ' +
          applicant.applicant.fullName +
          ' згода ' +
          applicant.getPKFaculty() +
          ' ' +
          applicant.getFaculty() +
          ' резолюція ' +
          resolution +
          ' ' +
          this.getResolutionStaffNameRByResolution(resolution) +
          '.'
      : '';
  }

  getTextPart3(
    agenda: Agenda,
    applicant: Applicant,
    source: string,
    resolution: string,
    addition: string,
    zavKurs: string,
    previousEducationalEstablishment: string
  ): string {
    return agenda.key === 'Відраховані за власним бажанням' ||
      agenda.key == 'Відраховані, що без оплати' ||
      agenda.key == 'Відраховані, що не уклали договір про навчання'
      ? (addition == '' ? '' : addition + ' ') +
          applicant.applicant.fullName +
          (+applicant.applicant.idCard < 1000
            ? ''
            : ', IDe - ' + applicant.applicant.idCard) +
          ', ' +
          (applicant.getEducationDegree() == 'Phd'
            ? GenderSelectMap[applicant.getGender()].asp
            : GenderSelectMap[applicant.getGender()].stud) +
          ' ' +
          applicant.applicant.course +
          '-го курсу, ' +
          applicant.getFacultyFullName2022() +
          ', ' +
          (applicant.getEducationDegree() == 'Phd'
            ? applicant.getFacultyFullName2022()
            : applicant.getFacultyFullNameR()) +
          (applicant.applicant.group.length == 0 ? ', ' : ' гр. ') +
          (applicant.applicant.group.length == 0
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
          (applicant.applicant.idEducationProgram.length == 0
            ? applicant.applicant.specialty
            : applicant.getEducationProgramSpecialty()) +
          '», ' +
          (applicant.getSpecialtyNumbers() == '035' ||
          applicant.getSpecialtyNumbers() == '022'
            ? 'спеціалізація «' +
              applicant.getEducationProgramSpecialty() +
              '», '
            : ' ') +
          (applicant.getEducationDegree() == 'Phd'
            ? 'освітня програма «' + applicant.getEducationProgramName()
            : agenda.key == 'Відраховані за власним бажанням' ||
              agenda.key == 'Відраховані, що без оплати' ||
              agenda.key == 'Відраховані, що не уклали договір про навчання'
            ? applicant.applicant.idEducationProgram.length == 0
              ? 'освітні програми «' + applicant.getKpOsvintiProgrami() + '»'
              : ' освітня програма «' +
                applicant.getEducationProgramName() +
                '»'
            : (applicant.applicant.idEducationProgram.length == 0
                ? 'з освітньої програми «' +
                  applicant.getKpOsvintiProgrami() +
                  '» на освітню програму «' +
                  applicant.getEducationProgramName() +
                  '»' +
                  applicant.getEducationProgramName()
                : '') +
              (source == ''
                ? '.'
                : '. ' +
                  (agenda.key == 'Відраховані, що без оплати' ||
                  agenda.key == 'Відраховані, що без оплати' ||
                  agenda.key == 'Відраховані, що не уклали договір про навчання'
                    ? 'Підстава: ' +
                      source +
                      ', резолюція ' +
                      resolution +
                      ' ' +
                      this.getResolutionStaffNameRByResolution(resolution) +
                      '.'
                    : 'Підстава: заява ст.' +
                      applicant.applicant.fullName +
                      '. ' +
                      ' резолюція ' +
                      resolution +
                      ' ' +
                      this.getResolutionStaffNameRByResolution(resolution) +
                      '.')))
      : '';
  }

  getTextPart4(
    agenda: Agenda,
    applicant: Applicant,
    source: string,
    resolution: string,
    addition: string,
    zavKurs: string,
    previousEducationalEstablishment: string
  ): string {
    return agenda.key == 'Переведення на освітню програму'
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
          ', ' +
          (applicant.getEducationDegree() == 'Phd'
            ? applicant.getFacultyFullName2022()
            : applicant.getFacultyFullNameR()) +
          (applicant.applicant.group.length == 0 ? ', ' : ' гр. ') +
          (applicant.applicant.group.length == 0
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
          (applicant.applicant.idEducationProgram.length == 0
            ? applicant.applicant.specialty
            : applicant.getEducationProgramSpecialty()) +
          '», ' +
          (applicant.getSpecialtyNumbers() == '035'
            ? 'спеціалізація «' +
              applicant.getEducationProgramSpecialty() +
              '», '
            : ' ') +
          (applicant.getEducationDegree() == 'Phd'
            ? 'освітня програма «' + applicant.getEducationProgramName()
            : // : agenda.key == 'Зміна фінансування'
              // ? 'освітня програма «' + applicant.getEducationProgramName()
              (applicant.applicant.idEducationProgram.length == 0
                ? 'освітні програми «'
                : 'з освітньої програми «') +
              (applicant.applicant.idEducationProgram.length == 0
                ? applicant.getKpOsvintiProgrami()
                : applicant.getEducationProgramName()) +
              '» на освітню програму «' +
              applicant.getEducationProgramName()) +
          '»' +
          '. Підстава: заява ст.' +
          applicant.applicant.fullName +
          '. ' +
          ' резолюція ' +
          resolution +
          ' ' +
          this.getResolutionStaffNameRByResolution(resolution) +
          '.'
      : '';
  }

  getTextPart5(
    agenda: Agenda,
    applicant: Applicant,
    source: string,
    resolution: string,
    addition: string,
    zavKurs: string,
    previousEducationalEstablishment: string
  ): string {
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
          (applicant.applicant.group.length == 0 ? ', ' : ' гр. ') +
          (applicant.applicant.group.length == 0
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
          (applicant.applicant.idEducationProgram.length == 0
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
            ? 'освітня програма «' + applicant.getEducationProgramName() + '»'
            : agenda.key == 'Зміна фінансування' ||
              agenda.key == 'Зміна фінансування кк4' ||
              agenda.key == 'Зміна фінансування кк5' ||
              agenda.key == 'Зміна фінансування кк6' ||
              agenda.key == 'Зміна фінансування кк7' ||
              agenda.key ==
                'Зміна фінансування серед зарахованих на контракт за рейтингом' ||
              agenda.key == 'Зміна фінансування серед пільгових категорій'
            ? applicant.applicant.idEducationProgram.length == 0
              ? 'з подальшим розподілом на одну з освітніх програм «' +
                applicant.getKpOsvintiProgrami() +
                '»'
              : ' освітня програма «' +
                applicant.getEducationProgramName() +
                '»'
            : applicant.applicant.idEducationProgram.length == 0
            ? 'з освітньої програми «' +
              applicant.getKpOsvintiProgrami() +
              '» на освітню програму «' +
              applicant.getEducationProgramName() +
              '»'
            : '') +
          (source == ''
            ? '.'
            : '. ' +
              +(agenda.key == 'Зміна фінансування' ||
              agenda.key == 'Зміна фінансування кк4' ||
              agenda.key == 'Зміна фінансування кк5' ||
              agenda.key == 'Зміна фінансування кк6' ||
              agenda.key == 'Зміна фінансування серед пільгових категорій'
                ? 'Підстава: ' + source + '.'
                : 'Підстава: заява ст.' +
                  applicant.applicant.fullName +
                  '. ' +
                  ' резолюція ' +
                  resolution +
                  ' ' +
                  this.getResolutionStaffNameRByResolution(resolution) +
                  '.'))
      : '';
  }

  getResolutionStaffNameRByResolution(resolution: string) {
    return staffData.find((s) => s.position_r === resolution)?.fullName_r;
  }
}
