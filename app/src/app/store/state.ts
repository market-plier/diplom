import { Agenda } from '../api/contracts/agenda';
import { Applicant } from '../api/contracts/applicant';
import { Staff } from '../api/contracts/staff';
import { TemplateData } from '../api/contracts/templateData';

export interface State {
  agenda: Agenda[];
  staff: Staff[];
  applicants: Applicant[];
  templateData: TemplateData;
}
