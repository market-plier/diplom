import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Agenda } from '../api/contracts/agenda';
import { AgendaDialogComponent } from '../dialogs/agenda-dialog/agenda-dialog.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent {
  /**
   *
   */
  constructor(private dialog: MatDialog, private dataService: DataService) {}

  openAgendaEditDialog() {
    this.dialog
      .open<AgendaDialogComponent, Agenda[]>(AgendaDialogComponent, {
        data: JSON.parse(
          JSON.stringify(this.dataService.state.agenda)
        ) as Agenda[],

        width: '100%',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value) {
          this.dataService.updateAgendaData(value);
        }
      });
  }
}
