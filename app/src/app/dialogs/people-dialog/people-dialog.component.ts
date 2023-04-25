import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IStaff, Staff } from 'src/app/api/contracts/staff';
@Component({
  selector: 'app-people-dialog',
  templateUrl: './people-dialog.component.html',
  styleUrls: ['./people-dialog.component.scss'],
})
export class PeopleDialogComponent {
  constructor(
    private readonly fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: { values: IStaff[] }
  ) {}
  displayedColumns: string[] = [
    'subdivision',
    'position',
    'positionGenitive',
    'fullName',
    'fullNameGenitive',
    'delete',
  ];

  dataSource = this.data.values;

  addRow() {
    this.dataSource = [new Staff(), ...this.dataSource];
  }

  deleteRow(staff: Staff) {
    this.dataSource = this.dataSource.filter(
      (d) => !this.isEqualStaff(d, staff)
    );
  }

  isEqualStaff(staffA: Staff, staffB: Staff) {
    return (
      staffA.fullName === staffB.fullName &&
      staffA.fullNameGenitive === staffB.fullNameGenitive &&
      staffA.position === staffB.position &&
      staffA.positionGenitive === staffB.positionGenitive &&
      staffA.subdivision === staffB.subdivision
    );
  }
}
