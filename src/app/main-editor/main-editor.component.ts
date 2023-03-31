import { EventEmitter, Input, Output } from '@angular/core';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import jsPDF from 'jspdf';
import { timesNewRoman } from 'src/assets/Times_New_Roman_Regular';
import { TemplateData } from '../api/contracts/templateData';
import {
  agendaData,
  decisionData,
  headerData,
  people,
  protocolData,
} from '../data/test-data';

@Component({
  selector: 'app-main-editor',
  templateUrl: './main-editor.component.html',
  styleUrls: ['./main-editor.component.scss'],
})
export class MainEditorComponent {
  people = people;
  @Input() form: FormGroup;
  @Output() preview = new EventEmitter<TemplateData>();
  constructor() {
    // Create sample projects

    // Setup form
    this.form = new FormGroup({
      header: new FormControl(headerData),
      protocol: new FormControl(protocolData),
      people: new FormControl(),
      agenda: new FormControl(agendaData),
      decision: new FormControl(decisionData),
      secretar: new FormControl(),
      rector: new FormControl(),
    });
    this.form
      .get('people')
      ?.valueChanges.subscribe((value) => console.log(this.form.getRawValue()));
  }

  onPreviewClick() {
    this.preview.emit(this.form.getRawValue());
  }
}
