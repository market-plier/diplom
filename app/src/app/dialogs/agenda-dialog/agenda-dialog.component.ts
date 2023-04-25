import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Agenda, IAgenda } from 'src/app/api/contracts/agenda';
import { SpinnerService } from 'src/app/services/spinner.service';
@Component({
  selector: 'app-agenda-dialog',
  templateUrl: './agenda-dialog.component.html',
  styleUrls: ['./agenda-dialog.component.scss'],
})
export class AgendaDialogComponent {
  constructor(
    private readonly fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: IAgenda[],
    private loading: SpinnerService
  ) {}
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
  ];

  dataSource = this.data;

  addRow() {
    const agenda = new Agenda();
    this.dataSource = [agenda, ...this.dataSource];
    agenda.id = this.dataSource.length.toString();
  }

  deleteRow(agenda: IAgenda) {
    this.dataSource = this.dataSource.filter(
      (d) => !this.isEqualStaff(d, agenda)
    );
  }

  isEqualStaff(agendaA: Agenda, agendaB: Agenda) {
    return agendaA.id === agendaB.id && agendaA.keyword === agendaB.keyword;
  }
}
