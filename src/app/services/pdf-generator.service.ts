import { ElementRef, Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { timesNewRoman } from 'src/assets/Times_New_Roman_Regular';
import { timesNewRomanBold } from 'src/assets/Times_New_Roman_Regular_Bold';

@Injectable({
  providedIn: 'root',
})
export class PdfGeneratorService {
  constructor() {}
  public downloadAsPDF(document: ElementRef) {
    var doc = new jsPDF();
    doc.addFileToVFS('TimesNewRoman.ttf', timesNewRoman);
    doc.addFileToVFS('TimesNewRomanBold.ttf', timesNewRomanBold);
    doc.addFont('TimesNewRoman.ttf', 'Times New Roman', 'normal');
    doc.addFont('TimesNewRomanBold.ttf', 'Times New Roman', 'bold');
    var elementHTML = document.nativeElement;

    doc.html(elementHTML, {
      callback: function (doc) {
        // Save the PDF
        doc.save('protocol.pdf');
      },
      x: 15,
      y: 15,
      width: 170, //target width in the PDF document
      windowWidth: 650, //window width in CSS pixels
    });
  }
}
