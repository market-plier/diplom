import { EducationProgramData } from 'src/app/data/education-program-data';
import { EducationDegreeData } from 'src/app/data/educationDegree-data';
import { EntryBaseData } from 'src/app/data/entryBase-data';
import { FacultyData } from 'src/app/data/faculty-data';
import { Kp } from 'src/app/data/kp';
import { ZayaviInshiData } from 'src/app/data/zayavi-Inshi-data';

export interface IApplicant {
  fullName: string;
  idCard: string;
  gender: string;
  nationalityFull: string;
  facultyFull: string;
  educationStartDate: string;
  educationEndDate: string;
  educationDegreeFull: string;
  entryBaseFull: string;
  formOfEducationFull: string;
  sourceOfFunding: string;
  specialty: string;
  idEducationProgram: string;
  educationProgramName: string;
  course: string;
  group: string;
  enrollmentInformation: string;
  addition?: string;
}

export class Applicant {
  applicant: IApplicant;

  constructor(data: IApplicant) {
    this.applicant = data;
  }
  getFullNameR() {
    throw new Error('');
  }

  getFullNameD() {
    throw new Error('');
  }

  getNationality() {
    return this.applicant.nationalityFull === 'Україна' ? 'УКР' : 'ІН';
  }

  getGender() {
    return this.applicant.gender as Gender;
  }

  getFullEDucationForm() {
    return this.applicant.formOfEducationFull === 'Заочна'
      ? 'заочної форми навчання'
      : 'денної форми навчання';
  }

  getFullSourceOfFunding() {
    this.applicant.sourceOfFunding.toLowerCase() === 'бюджет'
      ? 'за рахунок видатків державного бюджету'
      : this.applicant.sourceOfFunding.toLowerCase() === 'контракт'
      ? 'за кошти фізичних та/або юридичних осіб'
      : '';
  }

  getEducationDegree() {
    return EducationDegreeData.find(
      (e) => e.educationDegreeFull === this.applicant.educationDegreeFull
    )?.educationDegree;
  }

  getEducationDegreeR() {
    return EducationDegreeData.find(
      (e) => e.educationDegreeFull === this.applicant.educationDegreeFull
    )?.educationDegreeText_r;
  }

  getEntryBase() {
    return EntryBaseData.find(
      (e) => e.entryBaseFull === this.applicant.entryBaseFull
    )?.entryBase;
  }

  getEntryBaseStup() {
    return EntryBaseData.find(
      (e) => e.entryBaseFull === this.applicant.entryBaseFull
    )?.stup;
  }

  getEntryBaseFullR() {
    return EntryBaseData.find(
      (e) => e.entryBaseFull === this.applicant.entryBaseFull
    )?.enrtyBaseFull_r;
  }

  getFacultyFullName2022() {
    return FacultyData.find((f) => f.fullName === this.applicant.facultyFull)
      ?.fullName_r_2022;
  }

  getFacultyFullNameR() {
    return FacultyData.find((f) => f.fullName === this.applicant.facultyFull)
      ?.fullName_r;
  }

  getEducationProgram() {
    return EducationProgramData.find(
      (d) => d.idEducationProgram === this.applicant.idEducationProgram
    )?.specialty;
  }

  getSpecialtyNumbers() {
    return this.applicant.specialty.slice(0, 3);
  }

  getIdZayavi() {
    const searchString = 'Код заяви на вступ:';
    const idx = this.applicant.enrollmentInformation.indexOf(searchString);
    return this.applicant.enrollmentInformation
      .slice(idx + searchString.length)
      .trim();
  }

  getKpName() {
    return ZayaviInshiData.find((z) => z.idZayavki === this.getIdZayavi())
      ?.kpName;
  }

  getKpOsvintiProgrami() {
    return Kp.find((i) => i.propositionName === this.getKpName());
  }

  getFormOfEducation() {
    throw new Error('');

    return;
  }
}

export enum Gender {
  Male = 'Чоловіча',
  Female = 'Жіноча',
}
