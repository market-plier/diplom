import { IAgenda } from '../api/contracts/agenda';
import { IApplicant } from '../api/contracts/applicant';
import { IStaff } from '../api/contracts/staff';
import { TemplateData } from '../api/contracts/template-data';

export interface State {
  agenda: IAgenda[];
  staff: IStaff[];
  applicants: IApplicant[];
  templateData?: TemplateData;
  templatesData?: TemplateData[];
}
