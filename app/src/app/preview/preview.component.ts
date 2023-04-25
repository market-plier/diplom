import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { logoUrlData } from 'src/assets/images';
import { AgendaCompositeKey } from '../api/contracts/agenda';
import { DataService } from '../services/data.service';
import { PdfGeneratorService } from '../services/pdf-generator.service';
import { TextBuilderService } from '../services/text-builder.service';
import { selectTemplateData } from '../store/selectors';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent {
  @ViewChild('document') document!: ElementRef;
  logo = logoUrlData;
  templateData$ = this.store.select(selectTemplateData);
  constructor(
    private pdfService: PdfGeneratorService,
    public readonly dataService: DataService,
    private store: Store,
    public readonly textService: TextBuilderService
  ) {}
  public onGenerateClick() {
    // console.log(this.template);
    this.pdfService.downloadAsPDF(this.document);
  }

  getAgendaValue(agendaKey: AgendaCompositeKey, questionId: number) {
    const agenda = this.dataService.getAgendaByKey(agendaKey);
    return this.textService.getAgendaValue(questionId, agenda);
  }

  getDecisionValue(agendaKey: AgendaCompositeKey, questionId: number): string {
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

  convertDate(date: string) {
    const months = [
      'січня',
      'лютого',
      'березня',
      'квітня',
      'травня',
      'червня',
      'липня',
      'серпня',
      'вересня',
      'жовтня',
      'листопада',
      'грудня',
    ];

    const selectedData = new Date(date);

    const day = selectedData.getDate();
    const month = months[selectedData.getMonth()];
    const year = selectedData.getFullYear();

    const formattedDate = `${day} ${month} ${year} року`;

    return formattedDate;
  }
}
