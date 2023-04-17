import { EducationProgramData } from 'src/app/data/education-program-data';
import { EducationDegreeData } from 'src/app/data/educationDegree-data';
import { EntryBaseData } from 'src/app/data/entryBase-data';
import { FacultyData } from 'src/app/data/faculty-data';
import { Kp } from 'src/app/data/kp';
import { staffData } from 'src/app/data/staff-data';
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
    console.warn('needs connection to backend');
    return this.applicant.fullName;
  }

  getFullNameD() {
    console.warn('needs connection to backend');
    return this.applicant.fullName;
  }

  getNationality() {
    return this.applicant.nationalityFull === 'Україна' ? 'УКР' : 'ІН';
  }

  getGender() {
    return this.applicant.gender as Gender;
  }

  getFullEDucationForm() {
    return this.applicant.formOfEducationFull.toLowerCase() === 'заочна'
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
      (e) =>
        e.educationDegreeFull.toLowerCase() ===
        this.applicant.educationDegreeFull.toLowerCase()
    )?.educationDegree;
  }

  getEducationDegreeR() {
    return EducationDegreeData.find(
      (e) =>
        e.educationDegreeFull.toLowerCase() ===
        this.applicant.educationDegreeFull.toLowerCase()
    )?.educationDegreeText_r;
  }

  getEntryBase() {
    return EntryBaseData.find(
      (e) =>
        e.entryBaseFull.toLowerCase() ===
        this.applicant.entryBaseFull.toLowerCase()
    )?.entryBase;
  }

  getEntryBaseStup() {
    return EntryBaseData.find(
      (e) =>
        e.entryBaseFull.toLowerCase() ===
        this.applicant.entryBaseFull.toLowerCase()
    )?.stup;
  }

  getEntryBaseFullR() {
    return EntryBaseData.find(
      (e) =>
        e.entryBaseFull.toLowerCase() ===
        this.applicant.entryBaseFull.toLowerCase()
    )?.enrtyBaseFull_r;
  }

  getFacultyFullName2022() {
    return FacultyData.find(
      (f) =>
        f.fullName.toLowerCase() === this.applicant.facultyFull.toLowerCase()
    )?.fullName_r_2022;
  }

  getFaculty() {
    return FacultyData.find(
      (f) =>
        f.fullName.toLowerCase() === this.applicant.facultyFull.toLowerCase()
    )?.faculty;
  }

  getFacultyFormFull2021() {
    return FacultyData.find(
      (f) =>
        f.fullName.toLowerCase() === this.applicant.facultyFull.toLowerCase()
    )?.fullForm;
  }

  getFacultyFullNameR() {
    return FacultyData.find(
      (f) =>
        f.fullName.toLowerCase() === this.applicant.facultyFull.toLowerCase()
    )?.fullName_r;
  }

  getPKFaculty() {
    return staffData.find(
      (s) => s.subdivision.toLowerCase() === this.getFaculty()?.toLowerCase()
    )?.position_r;
  }

  getEducationProgramName() {
    return EducationProgramData.find(
      (d) =>
        d.idEducationProgram.toLowerCase() ===
        this.applicant.idEducationProgram.toLowerCase()
    )?.fullName;
  }

  getFinFull() {
    return this.applicant.sourceOfFunding.toLowerCase() === 'бюджет'
      ? 'за рахунок видатків державного бюджету'
      : this.applicant.sourceOfFunding.toLowerCase() === 'контракт'
      ? 'за кошти фізичних та/або юридичних осіб'
      : '';
  }

  getEducationProgramSpecialty() {
    return EducationProgramData.find(
      (d) =>
        d.idEducationProgram.toLowerCase() ===
        this.applicant.idEducationProgram.toLowerCase()
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
