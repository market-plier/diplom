import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { first } from 'rxjs';
import { AgendaCompositeKey, IApplicantPoint } from '../api/contracts/agenda';
import {
  EducationDegree,
  EntryBase,
  FormOfEducation,
  Nationality,
} from '../api/contracts/enums';
import { TemplateData } from '../api/contracts/templateData';
import { PeopleDialogComponent } from '../dialogs/people-dialog/people-dialog.component';
import { DataService } from '../services/data.service';
import { TextBuilderService } from '../services/text-builder.service';
import { TemplateDataActions } from '../store/actions';
import {
  selectAgendaKeys,
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

  keys$ = this.store.select(selectAgendaKeys);
  staffKeys$ = this.store.select(selectStaffKeys);
  staffResolutions$ = this.store.select(selectStaffResolutions);

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    public dialog: MatDialog,
    private store: Store,
    private textService: TextBuilderService
  ) {
    this.form = this.formBuilder.group({
      header: ['', Validators.required],
      protocol: ['', Validators.required],
      people: ['', Validators.required],
      agendaKeys: this.getAgendaArrayControlls([]),
      secretar: [, Validators.required],
      rector: ['', Validators.required],
    });
    this.store
      .select(selectTemplateData)
      .pipe(first())
      .subscribe((templateData) => {
        this.form.patchValue(templateData);
        if (templateData.agendaKeys) {
          templateData.agendaKeys.forEach((a) => {
            this.addAgendaPoint(a);
          });
        } else {
          this.addAgendaPoint();
        }
      });
    this.form.valueChanges.subscribe((value) => {
      this.store.dispatch(
        TemplateDataActions.updateTemplateData({ templateData: value })
      );
    });
  }

  get people() {
    return this.dataService.allPeople.map((p) => p.fullName);
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
    const applicantPoints = agendaKey.applicantPoints?.map((a) => {
      return {
        applicant: this.dataService.getApplicantByFullName(a.applicant ?? ''),
        source: a.source ?? '',
        resolution: a.resolution ?? '',
        zavKurs: a.zavKurs ?? '',
        previousEducationalEstablishment:
          a.previousEducationalEstablishment ?? '',
        addition: a.addition ?? '',
      };
    });
    if (agenda) {
      return this.textService.getDecisionValue(
        questionId,
        agenda,
        heard,
        speaker,
        applicantPoints
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
      applicantPoints: this.createApplicantsArrayControll(
        agenda?.applicantPoints ?? [{}]
      ),
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
    localStorage.setItem(
      'documentData',
      JSON.stringify(this.form.getRawValue())
    );
    const templateData = JSON.parse(
      localStorage.getItem('documentData') ?? '{}'
    ) as TemplateData;
    this.dataService.updateTemplateData(templateData);
    this.router.navigate(['preview']);
  }

  openDialog() {
    this.dialog
      .open(PeopleDialogComponent, {
        data: {
          values: JSON.parse(JSON.stringify(this.dataService.people)),
        },
        width: '800px',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value) {
          this.dataService.allPeople = value;
        }
      });
  }
}
