import { ElementRef, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class PdfGeneratorService {
  constructor() {}
  public downloadAsPDF(document: ElementRef) {
    var WinPrint = window.open(
      '',
      '',
      'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0'
    )!;
    WinPrint.document.write(document.nativeElement.innerHTML);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    setTimeout(() => {
      WinPrint.close();
    }, 1000);
  }
}
