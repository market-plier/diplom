import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-people-dialog',
  templateUrl: './people-dialog.component.html',
  styleUrls: ['./people-dialog.component.scss'],
})
export class PeopleDialogComponent {
  constructor(
    private readonly fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: { values: { id: string; fullName: string }[] }
  ) {}
  displayedColumns: string[] = ['id', 'fullName'];

  get dataSource() {
    return this.data.values;
  }
}
