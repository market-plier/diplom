import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Agenda } from 'src/app/api/contracts/agenda';
@Component({
  selector: 'app-agenda-dialog',
  templateUrl: './agenda-dialog.component.html',
  styleUrls: ['./agenda-dialog.component.scss'],
})
export class AgendaDialogComponent {
  constructor(
    private readonly fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: Agenda[]
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

  get dataSource() {
    return this.data;
  }
}
