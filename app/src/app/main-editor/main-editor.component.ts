import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TemplateData } from '../api/contracts/templateData';
import { headerData, people, protocolData } from '../data/test-data';
import { DataService } from '../services/data.service';
import {
  AgendaData,
  EducationDegree,
  EntryBase,
  FormOfEducation,
  Nationality,
  formOfEducationRecord,
  keywords,
} from '../data/enums';
import { pynkts } from '../data/agenda-data-map';
import { MatDialog } from '@angular/material/dialog';
import { PeopleDialogComponent } from '../dialogs/people-dialog/people-dialog.component';

@Component({
  selector: 'app-main-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.scss'],
})
export class MainEditorComponent {
  @Input() form: FormGroup;
  @Output() preview = new EventEmitter<TemplateData>();

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.form = this.formBuilder.group({
      header: [dataService.templateData.header, Validators.required],
      protocol: [dataService.templateData.protocol, Validators.required],
      people: [dataService.templateData.people, Validators.required],
      agenda: this.getAgendaArrayControlls(dataService.templateData.agenda),
      decision: this.getAgendaArrayControlls(dataService.templateData.decision),
      secretar: [dataService.templateData.secretar, Validators.required],
      rector: [dataService.templateData.rector, Validators.required],
    });
  }

  get people() {
    return this.dataService.allPeople.map((p) => p.fullName);
  }

  get keywords() {
    return keywords;
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
    return this.form.get('agenda') as FormArray;
  }

  get decisionPoints(): FormArray {
    return this.form.get('decision') as FormArray;
  }

  getArrayControlls(values: string[]) {
    return this.formBuilder.array(
      values.map((value) =>
        this.formBuilder.control(value, Validators.required)
      ),
      Validators.required
    );
  }

  getAgendaArrayControlls(values: AgendaData[]) {
    return this.formBuilder.array(
      values.map((value) => this.createAgendaGroup(value)),
      Validators.required
    );
  }

  getAgendaValue(agendaForm: FormGroup) {
    const agendaData = agendaForm.value as AgendaData;
    return this.dataService.getAgendaValue(agendaData);
  }

  getDecisionValue(decisionForm: FormGroup) {
    const decisionData = decisionForm.value as AgendaData;
    return this.dataService.getDecisionValue(decisionData);
  }

  createAgendaGroup(agenda?: AgendaData) {
    return this.formBuilder.group({
      keyword: [agenda?.keyword, Validators.required],
      nationality: [agenda?.nationality, Validators.required],
      formOfEducation: [agenda?.formOfEducation, Validators.required],
      entryBase: [agenda?.entryBase, Validators.required],
      educationDegree: [agenda?.educationDegree, Validators.required],
    });
  }

  addAgendaPoint() {
    const agendaControll = this.createAgendaGroup();
    const decisionControll = this.createAgendaGroup();

    this.decisionPoints.push(decisionControll);
    this.agendaPoints.push(agendaControll);
  }

  deleteAgendaPoint(agendaIndex: number) {
    this.agendaPoints.removeAt(agendaIndex);
    this.decisionPoints.removeAt(agendaIndex);
  }

  onPreviewClick() {
    console.log(this.form.getRawValue());
    localStorage.setItem(
      'documentData',
      JSON.stringify(this.form.getRawValue())
    );
    this.dataService.templateData = JSON.parse(
      localStorage.getItem('documentData') ?? '{}'
    ) as TemplateData;
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
