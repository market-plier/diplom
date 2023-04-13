export interface Applicant {
  fullName: string;
  fullName_r: string;
  fullName_d: string;
  idCard: string;
  gender: string;
  course: string;
  group: string;
  specialty: string;
  idEducationProgram: string;
  educationProgramName: string;
}

export enum Gender {
  Male = 'Чоловіча',
  Female = 'Жіноча',
}
