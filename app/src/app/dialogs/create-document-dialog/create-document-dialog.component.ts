import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-document-dialog',
  templateUrl: './create-document-dialog.component.html',
  styleUrls: ['./create-document-dialog.component.scss'],
})
export class CreateDocumentDialogComponent {
  formControll = new FormControl('', Validators.required);
}
