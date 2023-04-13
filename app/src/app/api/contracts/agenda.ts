import {
  EducationDegreeType,
  EntryBaseType,
  FormOfEducationType,
  NationalityType,
} from './enums';

export interface Agenda {
  id: string;
  key: string;
  agendaType: string;
  decisionType: string;
  part1: string;
  part2: string;
  part3: string;
  part4: string;
  nationality: NationalityType;
  entryBase: EntryBaseType;
  educationDegree: EducationDegreeType;
  formOfEducation: FormOfEducationType;
}
