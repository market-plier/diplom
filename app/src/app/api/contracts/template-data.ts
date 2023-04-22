import { AgendaCompositeKey } from './agenda';

export interface TemplateData {
  header?: string;
  protocol?: string;
  people?: { id: string; fullName: string }[];
  agendaKeys?: AgendaCompositeKey[];
  secretar?: string;
  rector?: string;
  date?: string;
  name?: string;
  id?: number;
}
