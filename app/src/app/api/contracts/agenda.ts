import { _agendaData } from 'src/app/data/agenda-data-map';
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

export interface AgendaCompositeKey {
  keyword?: string;
  nationality?: NationalityType;
  entryBase?: EntryBaseType;
  agendaAddition?: string;
  educationDegree?: EducationDegreeType;
  formOfEducation?: FormOfEducationType;
  speaker?: string;
  heard?: string;
  applicantPoints?: IApplicantPoint[];
}

export interface IApplicantPoint {
  applicant?: string;
  source?: string;
  resolution?: string;
  zavKurs?: string;
  previousEducationalEstablishment?: string;
  addition?: string;
}

export const keywords = [...new Set(_agendaData.map((pynkt) => pynkt.key))];
