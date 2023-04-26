import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IAgenda } from '../api/contracts/agenda';
import { AgendaDialogComponent } from '../dialogs/agenda-dialog/agenda-dialog.component';
import { PeopleDialogComponent } from '../dialogs/people-dialog/people-dialog.component';
import { DataService } from '../services/data.service';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent {
  /**
   *
   */
  constructor(
    private dialog: MatDialog,
    private dataService: DataService,
    private loading: SpinnerService
  ) {}

  openAgendaEditDialog() {
    this.loading.loading = true;

    setTimeout(() => {
      const dial = this.dialog.open<AgendaDialogComponent, IAgenda[]>(
        AgendaDialogComponent,
        {
          data: JSON.parse(
            JSON.stringify(this.dataService.state.agenda)
          ) as IAgenda[],

          width: '95vw',
          height: '95vh',
          maxWidth: '98vw',
        }
      );
      dial.afterClosed().subscribe((value) => {
        if (value) {
          this.dataService.updateAgendaData(value);
        }
      });
      dial.afterOpened().subscribe((_) => {
        this.loading.loading = false;
      });
    }, 30);
  }

  openDialog() {
    this.dialog
      .open(PeopleDialogComponent, {
        data: {
          values: JSON.parse(JSON.stringify(this.dataService.state.staff)),
        },
        width: '100%',
        height: '95vh',
        maxWidth: '98vw',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value) {
          this.dataService.updateStaffData(value);
        }
      });
  }
}
