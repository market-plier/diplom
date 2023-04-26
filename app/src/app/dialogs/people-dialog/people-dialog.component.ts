import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatTableDataSource,
  MatTableDataSourcePaginator,
} from '@angular/material/table';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { IStaff, Staff } from 'src/app/api/contracts/staff';
@Component({
  selector: 'app-people-dialog',
  templateUrl: './people-dialog.component.html',
  styleUrls: ['./people-dialog.component.scss'],
})
export class PeopleDialogComponent {
  dataSource?: MatTableDataSource<IStaff, MatTableDataSourcePaginator>;

  private filter$ = new Subject<string>();
  displayedColumns: string[] = [
    'subdivision',
    'position',
    'positionGenitive',
    'fullName',
    'fullNameGenitive',
    'delete',
  ];

  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(
    private readonly fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: { values: IStaff[] }
  ) {}

  ngOnInit() {
    this.filter$
      .pipe(
        debounceTime(400), // discard emitted values that take less than the specified time between output
        distinctUntilChanged() // only emit when value has changed
      )
      .subscribe((filter) => {
        if (this.dataSource) {
          this.dataSource.filter = filter;
        }
      });
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.data.values);
    this.dataSource.paginator = this.paginator;
  }

  addRow() {
    const agenda = new Staff();
    if (this.dataSource) {
      this.dataSource.data = [agenda, ...this.dataSource.data];
    }
  }

  deleteRow(agenda: IStaff) {
    if (this.dataSource) {
      this.dataSource.data = this.dataSource.data.filter(
        (d) => !this.isEqualStaff(d, agenda)
      );
    }
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

  applyFilter(event: Event) {
    this.filter$.next((event.target as HTMLInputElement).value);
  }
}
