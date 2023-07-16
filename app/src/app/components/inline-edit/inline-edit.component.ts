import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-inline-edit',
  templateUrl: './inline-edit.component.html',
  styleUrls: ['./inline-edit.component.scss'],
})
export class InlineEditComponent {
  @Output() update = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() click = new EventEmitter();
  @Input() isActive = false;
  @Input() value = '';
  @Input() date = '';
  @Input() link = '';
}
