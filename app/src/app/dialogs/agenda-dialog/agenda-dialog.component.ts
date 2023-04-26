import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatTableDataSource,
  MatTableDataSourcePaginator,
} from '@angular/material/table';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Agenda, IAgenda } from 'src/app/api/contracts/agenda';
import { SpinnerService } from 'src/app/services/spinner.service';
@Component({
  selector: 'app-agenda-dialog',
  templateUrl: './agenda-dialog.component.html',
  styleUrls: ['./agenda-dialog.component.scss'],
})
export class AgendaDialogComponent {
  dataSource?: MatTableDataSource<IAgenda, MatTableDataSourcePaginator>;

  private filter$ = new Subject<string>();

  displayedColumns: string[] = [
    'id',
    'keyword',
    'agendaType',
    'part1',
    'part2',
    'part3',
    'part4',
    'decisionType',
    'keyNationality',
    'keyFormOfEducation',
    'keyEntryBase',
    'keyEducationDegree',
    'delete',
  ];

  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(
    private readonly fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: IAgenda[],
    private loading: SpinnerService
  ) {
    data.forEach((d, idx) => (d.id = (idx + 1).toString()));
  }

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
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
  }

  addRow() {
    const agenda = new Agenda();
    if (this.dataSource) {
      this.dataSource.data = [agenda, ...this.dataSource.data];
      agenda.id = this.dataSource.data.length.toString();
    }
  }

  deleteRow(agenda: IAgenda) {
    if (this.dataSource) {
      this.dataSource.data = this.dataSource.data.filter(
        (d) => !this.isEqualStaff(d, agenda)
      );
    }
  }

  applyFilter(event: Event) {
    this.filter$.next((event.target as HTMLInputElement).value);
  }

  isEqualStaff(agendaA: Agenda, agendaB: Agenda) {
    return agendaA.id === agendaB.id && agendaA.keyword === agendaB.keyword;
  }
}
