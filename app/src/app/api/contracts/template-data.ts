import { AgendaCompositeKey } from './agenda';

export interface TemplateData {
  header?: string;
  protocol?: string;
  people?: string[];
  agendaKeys?: AgendaCompositeKey[];
  secretar?: string;
  rector?: string;
  date?: string;
  name?: string;
  id?: number;
}
