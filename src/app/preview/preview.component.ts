import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { timesNewRoman } from 'src/assets/Times_New_Roman_Regular';
import { TemplateData } from '../api/contracts/templateData';
import { logoUrlData } from 'src/assets/images';
import { timesNewRomanBold } from 'src/assets/Times_New_Roman_Regular_Bold';
import { PdfGeneratorService } from '../services/pdf-generator.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent {
  @Input() template: TemplateData = {};
  @ViewChild('document') document!: ElementRef;
  logo = logoUrlData;

  constructor(private pdfService: PdfGeneratorService) {}
  public onGenerateClick() {
    this.pdfService.downloadAsPDF(this.document);
  }
}
