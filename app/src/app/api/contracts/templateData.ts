import { AgendaData } from 'src/app/data/enums';

export interface TemplateData {
  header?: string;
  protocol?: string;
  people?: { id: string; fullName: string }[];
  agenda: AgendaData[];
  decision: AgendaData[];
  secretar?: string;
  rector?: string;
}
