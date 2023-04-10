import { pynkts } from './agenda-data-map';
import { agendaData } from './test-data';

export enum Nationality {
  all = 'Усі',
  ukr = 'УКР',
  foreign = 'ІН',
  foreignUkr = 'ЗАК УКР',
}

export type NationalityType = 'Усі' | 'УКР' | 'ІН' | 'ЗАК УКР';

export const nationalityRecord: Record<Nationality, NationalityType> = {
  [Nationality.all]: 'Усі',
  [Nationality.ukr]: 'УКР',
  [Nationality.foreign]: 'ІН',
  [Nationality.foreignUkr]: 'ЗАК УКР',
};

export enum FormOfEducation {
  all = 'Усі',
  extramural = 'Заочна',
  daily = 'Денна',
  evening = 'Вечірня',
  dz = 'Д&З',
}

export type FormOfEducationType =
  | 'Усі'
  | 'Заочна'
  | 'Денна'
  | 'Вечірня'
  | 'Д&З';

export const formOfEducationRecord: Record<
  FormOfEducation,
  FormOfEducationType
> = {
  [FormOfEducation.all]: 'Усі',
  [FormOfEducation.extramural]: 'Заочна',
  [FormOfEducation.daily]: 'Денна',
  [FormOfEducation.evening]: 'Вечірня',
  [FormOfEducation.dz]: 'Д&З',
};

export enum EntryBase {
  all = 'Усі',
  pzso = 'ПЗСО',
  pzsoMc = 'ПЗСО&МС',
  mc = 'МС',
  bak = 'БАК',
  mag = 'МАГ',
  bakMag = 'БАК&МАГ',
}

export type EntryBaseType =
  | 'Усі'
  | 'ПЗСО'
  | 'ПЗСО&МС'
  | 'МС'
  | 'БАК'
  | 'МАГ'
  | 'БАК&МАГ';

export const entryBaseRecord: Record<EntryBase, EntryBaseType> = {
  [EntryBase.all]: 'Усі',
  [EntryBase.pzso]: 'ПЗСО',
  [EntryBase.pzsoMc]: 'ПЗСО&МС',
  [EntryBase.mc]: 'МС',
  [EntryBase.bak]: 'БАК',
  [EntryBase.mag]: 'МАГ',
  [EntryBase.bakMag]: 'БАК&МАГ',
};

export enum EducationDegree {
  bakMag = 'БАК&МАГ',
  bak = 'БАК',
  bak2y = 'БАК(2р)',
  bak3y = 'БАК(3р)',
  bak2k = 'БАК(2к)',
  bak3k = 'БАК(3к)',
  mag = 'МАГ',
  mag1_4 = 'МАГ(1.4)',
  mag1_9 = 'МАГ(1.9)',
  phd = 'Phd',
  all = 'Усі',
}

export type EducationDegreeType =
  | 'БАК&МАГ'
  | 'БАК'
  | 'БАК(2р)'
  | 'БАК(3р)'
  | 'БАК(2к)'
  | 'БАК(3к)'
  | 'МАГ'
  | 'МАГ(1.4)'
  | 'МАГ(1.9)'
  | 'Phd'
  | 'Усі';

export const educationDegreeRecord: Record<
  EducationDegree,
  EducationDegreeType
> = {
  [EducationDegree.bakMag]: 'БАК&МАГ',
  [EducationDegree.bak]: 'БАК',
  [EducationDegree.bak2y]: 'БАК(2р)',
  [EducationDegree.bak3y]: 'БАК(3р)',
  [EducationDegree.bak2k]: 'БАК(2к)',
  [EducationDegree.bak3k]: 'БАК(3к)',
  [EducationDegree.mag]: 'МАГ',
  [EducationDegree.mag1_4]: 'МАГ(1.4)',
  [EducationDegree.mag1_9]: 'МАГ(1.9)',
  [EducationDegree.phd]: 'Phd',
  [EducationDegree.all]: 'Усі',
};

export interface AgendaData {
  keyword?: string;
  nationality?: NationalityType;
  entryBase?: EntryBaseType;
  educationDegree?: EducationDegreeType;
  formOfEducation?: FormOfEducationType;
}

export const keywords = [...new Set(pynkts.map((pynkt) => pynkt.keyword))];
