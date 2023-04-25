import { _agendaData } from 'src/app/data/agenda-data-map';
import {
  EducationDegreeType,
  EntryBaseType,
  FormOfEducationType,
  NationalityType,
} from './enums';
export interface IAgenda {
  id: string;
  keyword: string;
  agendaType: string;
  decisionType: string;
  part1: string;
  part2: string;
  part3: string;
  part4: string;
  keyNationality: NationalityType;
  keyEntryBase: EntryBaseType;
  keyEducationDegree: EducationDegreeType;
  keyFormOfEducation: FormOfEducationType;
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
}

export interface IApplicantPoint {
  applicant?: string;
  source?: string;
  resolution?: string;
  zavKurs?: string;
  previousEducationalEstablishment?: string;
  addition?: string;
}

export const keywords = [...new Set(_agendaData.map((pynkt) => pynkt.keyword))];

export class Agenda implements IAgenda {
  id = '';
  keyword = '';
  agendaType = '';
  decisionType = '';
  part1 = '';
  part2 = '';
  part3 = '';
  part4 = '';
  keyNationality = '' as NationalityType;
  keyEntryBase = '' as EntryBaseType;
  keyEducationDegree = '' as EducationDegreeType;
  keyFormOfEducation = '' as FormOfEducationType;
}
