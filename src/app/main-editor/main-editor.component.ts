import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TemplateData } from '../api/contracts/templateData';
import { headerData, people, protocolData } from '../data/test-data';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-main-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.scss'],
})
export class MainEditorComponent {
  people = people;
  @Input() form: FormGroup;
  @Output() preview = new EventEmitter<TemplateData>();

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      header: [dataService._templateData.header, Validators.required],
      protocol: [dataService._templateData.protocol, Validators.required],
      people: [dataService._templateData.people, Validators.required],
      agenda: this.getArrayControlls(dataService._templateData.agenda ?? ['']),
      // agenda: this.getTestData(),
      decision: this.getArrayControlls(
        dataService._templateData.decision ?? ['']
      ),
      secretar: [dataService._templateData.secretar, Validators.required],
      rector: [dataService._templateData.rector, Validators.required],
    });
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

  getTestData() {
    return this.formBuilder.array(
      [
        this.formBuilder.control(
          `By default in the CSS box model, the width and height you assign to an element is applied only to the element's content box. If the element has any border or padding, this is then added to the width and height to arrive at the size of the box that's rendered on the screen. This means that when you set width and height, you have to adjust the value you give to allow for any border or padding that may be added. For example, if you have four boxes with width: 25%;, if any has left or right padding or a left or right border, they will not by default fit on one line within the constraints of the parent container.`,
          Validators.required
        ),
        this.formBuilder.control(
          `By default in the CSS box model, the width and height you assign to an element is applied only to the element's content box. If the element has any border or padding, this is then added to the width and height to arrive at the size of the box that's rendered on the screen. This means that when you set width and height, you have to adjust the value you give to allow for any border or padding that may be added. For example, if you have four boxes with width: 25%;, if any has left or right padding or a left or right border, they will not by default fit on one line within the constraints of the parent container.`,
          Validators.required
        ),
        this.formBuilder.control(
          `By default in the CSS box model, the width and height you assign to an element is applied only to the element's content box. If the element has any border or padding, this is then added to the width and height to arrive at the size of the box that's rendered on the screen. This means that when you set width and height, you have to adjust the value you give to allow for any border or padding that may be added. For example, if you have four boxes with width: 25%;, if any has left or right padding or a left or right border, they will not by default fit on one line within the constraints of the parent container.`,
          Validators.required
        ),
        this.formBuilder.control(
          `By default in the CSS box model, the width and height you assign to an element is applied only to the element's content box. If the element has any border or padding, this is then added to the width and height to arrive at the size of the box that's rendered on the screen. This means that when you set width and height, you have to adjust the value you give to allow for any border or padding that may be added. For example, if you have four boxes with width: 25%;, if any has left or right padding or a left or right border, they will not by default fit on one line within the constraints of the parent container.`,
          Validators.required
        ),
      ],
      Validators.required
    );
  }

  addAgendaPoint() {
    const agendaControll = this.formBuilder.control('', Validators.required);

    this.agendaPoints.push(agendaControll);
  }

  deleteAgendaPoint(agendaIndex: number) {
    this.agendaPoints.removeAt(agendaIndex);
  }

  addDecisionPoint() {
    const decisionControll = this.formBuilder.control('', Validators.required);

    this.decisionPoints.push(decisionControll);
  }

  deleteDecisionPoint(decisionIndex: number) {
    this.decisionPoints.removeAt(decisionIndex);
  }

  onPreviewClick() {
    localStorage.setItem(
      'documentData',
      JSON.stringify(this.form.getRawValue())
    );
    this.dataService._templateData = JSON.parse(
      localStorage.getItem('documentData') ?? '{}'
    ) as TemplateData;
    this.router.navigate(['preview']);
  }
}
