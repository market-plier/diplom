import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { logoUrlData } from 'src/assets/images';
import { TemplateData } from '../api/contracts/templateData';
import { DataService } from '../services/data.service';
import { PdfGeneratorService } from '../services/pdf-generator.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent {
  @ViewChild('document') document!: ElementRef;
  logo = logoUrlData;

  constructor(
    private pdfService: PdfGeneratorService,
    public readonly dataService: DataService
  ) {}
  public onGenerateClick() {
    // console.log(this.template);
    this.pdfService.downloadAsPDF(this.document);
  }
}
