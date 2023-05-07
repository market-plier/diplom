import { DatePipe, registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TemplateData } from 'src/app/api/contracts/template-data';

registerLocaleData(localeUk);
@Component({
  selector: 'app-create-document-dialog',
  templateUrl: './create-document-dialog.component.html',
  styleUrls: ['./create-document-dialog.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'uk-UA' }],
})
export class CreateDocumentDialogComponent {
  formattedDate: any;
  form: FormGroup;

  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: { template: TemplateData }
  ) {
    this.form = this.formBuilder.group({
      name: [this.data?.template?.name ?? '1', Validators.required],
      date: [this.data?.template?.date ?? '', Validators.required],
    });
    if (!this.data?.template?.date) {
      setTimeout(() => {
        this.onDateChange({ value: new Date() });
      });
    }
  }

  onDateChange(event: any) {
    this.formattedDate = this.datePipe.transform(
      event.value,
      'd MMMM yyyy року',
      'uk-UA'
    )!;
    this.form.patchValue({ date: this.formattedDate });
  }
}
