import { AgendaCompositeKey } from 'src/app/api/contracts/enums';

export interface TemplateData {
  header?: string;
  protocol?: string;
  people?: { id: string; fullName: string }[];
  agendaKeys?: AgendaCompositeKey[];
  secretar?: string;
  rector?: string;
}
