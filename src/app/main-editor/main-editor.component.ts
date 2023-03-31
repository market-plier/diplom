import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import jsPDF from 'jspdf';
import { timesNewRoman } from 'src/assets/Times_New_Roman_Regular';
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
  form: FormGroup;
  get headerContent() {
    return this.form.get('header')?.value;
  }

  get protocolContent() {
    return this.form.get('protocol')?.value;
  }

  get peopleContent() {
    return this.form.get('people')?.value?.join('; ');
  }

  get agendaContent() {
    return this.form.get('agenda')?.value;
  }

  get decisionContent() {
    return this.form.get('decision')?.value;
  }

  get secretarContent() {
    return this.form.get('secretar')?.value;
  }

  get rectorContent() {
    return this.form.get('rector')?.value;
  }
  @ViewChild('document') document!: ElementRef;
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
  public downloadAsPDF() {
    var doc = new jsPDF();
    doc.addFileToVFS('TimesNewRomen.ttf', timesNewRoman);
    doc.addFont('TimesNewRomen.ttf', 'Times New Roman', 'normal');
    doc.setFont('Times New Roman', 'normal');
    var elementHTML = this.document.nativeElement;

    doc.html(elementHTML, {
      callback: function (doc) {
        // Save the PDF
        doc.save('sample-document.pdf');
      },
      x: 15,
      y: 15,
      width: 170, //target width in the PDF document
      windowWidth: 650, //window width in CSS pixels
    });
  }
}
