import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, first } from 'rxjs';
import { AgendaCompositeKey } from '../api/contracts/agenda';
import {
  EducationDegree,
  EntryBase,
  FormOfEducation,
  Nationality,
} from '../api/contracts/enums';
import { TemplateData } from '../api/contracts/template-data';
import { DataService } from '../services/data.service';
import { ComponentNavigationService } from '../services/navigation.service';
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
  formChangesSubscription?: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private store: Store,
    private textService: TextBuilderService,
    public componentNavigationService: ComponentNavigationService
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
    this.componentNavigationService.currentId$.pipe().subscribe((idParam) => {
      const id = Number(idParam);
      const template = this.dataService.getTemplateDataById(id);
      if (idParam && !template) {
        this.componentNavigationService.navigateToComponent('404');
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

  ngOnDestroy() {
    this.formChangesSubscription?.unsubscribe();
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
    return this.textService.getAgendaValue(agenda);
  }

  getDecisionValue(questionId: number, decisionForm: FormGroup) {
    const agendaKey = decisionForm.value as AgendaCompositeKey;
    const agenda = this.dataService.getAgendaByKey(agendaKey);
    const heard = this.dataService.getStaffByKey(agendaKey.heard ?? '');
    const speaker = this.dataService.getStaffByKey(agendaKey.speaker ?? '');
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
    });
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
    this.componentNavigationService.navigateToComponent('preview');
  }

  saveTemplate() {
    const template = this.form.getRawValue();
    template.id = this.currentId;
    this.dataService.upsertTemplate(template);
  }
}
