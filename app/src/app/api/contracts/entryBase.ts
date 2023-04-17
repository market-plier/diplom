import { EntryBaseType } from './enums';

export interface IEntryBase {
  entryBase: string;
  entryBaseFull: string;
  enrtyBaseFull_r: string;
  stup: string;
}

export type EntryBaseAtendeeType =
  | 'Усі'
  | 'ПЗСО'
  | 'ПЗСО&МС'
  | 'МС'
  | 'БАК'
  | 'МАГ'
  | 'БАК&МАГ';
