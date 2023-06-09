import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { first } from 'rxjs';
import { AgendaCompositeKey, IApplicantPoint } from '../api/contracts/agenda';
import {
  EducationDegree,
  EntryBase,
  FormOfEducation,
  Nationality,
} from '../api/contracts/enums';
import { TemplateData } from '../api/contracts/template-data';
import { DataService } from '../services/data.service';
import { TextBuilderService } from '../services/text-builder.service';
import {
  selectAgendaEducationDegreeKeys,
  selectAgendaEntryBaseKeys,
  selectAgendaFormOfEducationKeys,
  selectAgendaKeys,
  selectAgendaNationalityKeys,
  selectStaffKeys,
  selectStaffResolutions,
  selectTemplateData,
} from '../store/selectors';

@Component({
  selector: 'app-main-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.scss'],
})
export class MainEditorComponent {
  @Input() form: FormGroup;
  @Output() preview = new EventEmitter<TemplateData>();
  templateName = '';
  keys$ = this.store.select(selectAgendaKeys);
  staffKeys$ = this.store.select(selectStaffKeys);
  staffResolutions$ = this.store.select(selectStaffResolutions);

  nationalityKeys$ = this.store.select(selectAgendaNationalityKeys);
  formOfEducationKeys$ = this.store.select(selectAgendaFormOfEducationKeys);
  entryBaseKeys$ = this.store.select(selectAgendaEntryBaseKeys);
  educationDegreeKeys$ = this.store.select(selectAgendaEducationDegreeKeys);

  formattedDate?: string;

  headerDefaultValue = `МІНІСТЕРСТВО ОСВІТИ I НАУКИ УКРАЇНИ
НАЦІОНАЛЬНИЙ УНІВЕРСИТЕТ «ОДЕСЬКА ПОЛІТЕХНІКА»`;

  protocolDefaultValue = `Протокол №5
  засідання приймальної комісії`;
  currentId?: number;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    public dialog: MatDialog,
    private store: Store,
    private textService: TextBuilderService,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      header: ['', Validators.required],
      protocol: ['', Validators.required],
      people: ['', Validators.required],
      agendaKeys: this.getAgendaArrayControlls([]),
      secretar: [, Validators.required],
      rector: ['', Validators.required],
    });
  }

  get people() {
    return this.dataService.state.staff.map((p) => p.fullName);
  }

  get nationalities() {
    return Object.values(Nationality);
  }

  get formsOfEducation() {
    return Object.values(FormOfEducation);
  }
  get entryBases() {
    return Object.values(EntryBase);
  }
  get educationDegrees() {
    return Object.values(EducationDegree);
  }

  get agendaPoints(): FormArray {
    return this.form.get('agendaKeys') as FormArray;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      const id = Number(idParam);
      const template = this.dataService.getTemplateDataById(id);
      if (idParam && !template) {
        this.router.navigate(['/404']);
      }
      this.currentId = id;
      this.store
        .select(selectTemplateData)
        .pipe(first())
        .subscribe((templateData) => {
          if (templateData) {
            this.form.reset();
            this.agendaPoints.clear();
            const temp = Object.assign({}, templateData) as TemplateData;
            temp.header ?? (temp.header = this.headerDefaultValue);
            temp.protocol ?? (temp.protocol = this.protocolDefaultValue);
            this.form.patchValue(temp);
            this.templateName = temp.name ?? '';
            this.formattedDate = temp.date;
            if (temp.agendaKeys) {
              temp.agendaKeys.forEach((a) => {
                this.addAgendaPoint(a);
              });
            } else {
              this.addAgendaPoint();
            }
          }
        });
    });
  }

  getArrayControlls(values: string[]) {
    return this.formBuilder.array(
      values.map((value) =>
        this.formBuilder.control(value, Validators.required)
      ),
      Validators.required
    );
  }

  getAgendaArrayControlls(values: AgendaCompositeKey[]) {
    return this.formBuilder.array(
      values.map((value) => this.createAgendaGroup(value)),
      Validators.required
    );
  }

  getAgendaValue(questionId: number, agendaForm: FormGroup) {
    const agendaKey = agendaForm.value as AgendaCompositeKey;
    const agenda = this.dataService.getAgendaByKey(agendaKey);
    return this.textService.getAgendaValue(questionId, agenda);
  }

  getDecisionValue(questionId: number, decisionForm: FormGroup) {
    const agendaKey = decisionForm.value as AgendaCompositeKey;
    const agenda = this.dataService.getAgendaByKey(agendaKey);
    const heard = this.dataService.getStaffByKey(agendaKey.heard ?? '');
    const speaker = this.dataService.getStaffByKey(agendaKey.speaker ?? '');
    // const applicantPoints = agendaKey.applicantPoints?.map((a) => {
    //   return {
    //     applicant: this.dataService.getApplicantByFullName(a.applicant ?? ''),
    //     source: a.source ?? '',
    //     resolution: a.resolution ?? '',
    //     zavKurs: a.zavKurs ?? '',
    //     previousEducationalEstablishment:
    //       a.previousEducationalEstablishment ?? '',
    //     addition: a.addition ?? '',
    //   };
    // });
    if (agenda) {
      return this.textService.getDecisionValue(
        questionId,
        agenda,
        heard,
        speaker
      );
    }
    return '';
  }

  getApplicants(agendaForm: FormGroup) {
    const agendaKey = agendaForm.value as AgendaCompositeKey;
    const applicants = this.dataService.getApplicantsByKey(agendaKey);
    return applicants;
  }

  createAgendaGroup(agenda?: AgendaCompositeKey) {
    return this.formBuilder.group({
      keyword: [agenda?.keyword, Validators.required],
      nationality: [agenda?.nationality, Validators.required],
      formOfEducation: [agenda?.formOfEducation, Validators.required],
      entryBase: [agenda?.entryBase, Validators.required],
      educationDegree: [agenda?.educationDegree, Validators.required],
      speaker: [agenda?.speaker, Validators.required],
      heard: [agenda?.heard, Validators.required],
      agendaAddition: [agenda?.agendaAddition, Validators.required],
      // applicantPoints: this.createApplicantsArrayControll(
      //   agenda?.applicantPoints ?? [{}]
      // ),
    });
  }

  createApplicantsArrayControll(applicants: IApplicantPoint[] = []) {
    return this.formBuilder.array(
      applicants.map((a) => this.createApplicantGroup(a)),
      Validators.required
    );
  }

  createApplicantGroup(applicantPoint?: IApplicantPoint) {
    return this.formBuilder.group({
      applicant: [applicantPoint?.applicant, Validators.required],
      source: [applicantPoint?.source, Validators.required],
      resolution: [applicantPoint?.resolution, Validators.required],
      zavKurs: [applicantPoint?.zavKurs, Validators.required],
      previousEducationalEstablishment: [
        applicantPoint?.previousEducationalEstablishment,
        Validators.required,
      ],
      addition: [applicantPoint?.addition, Validators.required],
    });
  }

  getApplicantArrayControll(agendaForm: FormGroup) {
    return agendaForm.get('applicantPoints') as FormArray;
  }

  addApplicantPoint(agendaForm: FormGroup, applicantPoint?: IApplicantPoint) {
    const applicantControll = this.createApplicantGroup(applicantPoint);

    this.getApplicantArrayControll(agendaForm).push(applicantControll);
  }

  deleteApplicantPoint(agendaForm: FormGroup, agendaIndex: number) {
    this.getApplicantArrayControll(agendaForm).removeAt(agendaIndex);
  }

  addAgendaPoint(agendaKey?: AgendaCompositeKey) {
    const agendaControll = this.createAgendaGroup(agendaKey);

    this.agendaPoints.push(agendaControll);
  }

  deleteAgendaPoint(agendaIndex: number) {
    this.agendaPoints.removeAt(agendaIndex);
  }

  onPreviewClick() {
    this.saveTemplate();
    this.router.navigate(['preview']);
  }

  saveTemplate() {
    const template = this.form.getRawValue();
    template.id = this.currentId;
    this.dataService.upsertTemplate(template);
  }
}
