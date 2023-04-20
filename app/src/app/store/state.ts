import { Agenda } from '../api/contracts/agenda';
import { IApplicant } from '../api/contracts/applicant';
import { Staff } from '../api/contracts/staff';
import { TemplateData } from '../api/contracts/template-data';

export interface State {
  agenda: Agenda[];
  staff: Staff[];
  applicants: IApplicant[];
  templateData: TemplateData;
}
