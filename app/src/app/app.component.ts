import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { TemplateData } from './api/contracts/template-data';
import { CreateDocumentDialogComponent } from './dialogs/create-document-dialog/create-document-dialog.component';
import { DataService } from './services/data.service';
import { SpinnerService } from './services/spinner.service';
import { AgendaApiActions, StaffDataActions } from './store/actions';
import { selectTemplatesData } from './store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'diplom';
  templates$ = this.store
    .select(selectTemplatesData)
    .pipe(tap((x) => console.log(x)));
  constructor(
    private dialog: MatDialog,
    private dataService: DataService,
    private store: Store,
    private spinnerService: SpinnerService
  ) {}

  get loading() {
    return this.spinnerService.isLoading;
  }

  ngOnInit() {
    this.dataService
      .getAgenda()
      .subscribe((value) =>
        this.store.dispatch(
          AgendaApiActions.retrievedAgendas({ agendas: value })
        )
      );
    this.dataService
      .getStaffData()
      .subscribe((value) =>
        this.store.dispatch(StaffDataActions.updateStaffData({ staff: value }))
      );
  }

  onDeleteTemplate(template: TemplateData) {
    this.dataService.deleteTemplate(template);
  }

  onUpdateTemplateName(template: TemplateData, name: string) {
    const temp = Object.assign({}, template, { name });
    this.dataService.upsertTemplate(temp);
  }

  createNewDocument() {
    this.dialog
      .open<CreateDocumentDialogComponent>(CreateDocumentDialogComponent, {
        width: '500px',
      })
      .afterClosed()
      .subscribe((name) => {
        if (name) {
          this.onUpdateTemplateName({}, name);
        }
      });
  }
}
