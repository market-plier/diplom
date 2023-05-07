import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-inline-edit',
  templateUrl: './inline-edit.component.html',
  styleUrls: ['./inline-edit.component.scss'],
})
export class InlineEditComponent {
  isEdit = false;

  @Output() update = new EventEmitter();
  @Output() delete = new EventEmitter();

  @Input() value = '';
  @Input() date = '';
  @Input() link = '';
}
