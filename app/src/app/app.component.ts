import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
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
  templates$ = this.store.select(selectTemplatesData);
  constructor(
    private dialog: MatDialog,
    private dataService: DataService,
    private store: Store,
    private spinnerService: SpinnerService,
    private router: Router
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

  onUpdateTemplateName(template: TemplateData) {
    this.dialog
      .open<CreateDocumentDialogComponent>(CreateDocumentDialogComponent, {
        width: '500px',
        data: {
          template: JSON.parse(JSON.stringify(template)),
        },
      })
      .afterClosed()
      .subscribe(({ name, date }) => {
        if (name && date) {
          const newTemplate = this.updateTemplate(template, name, date);
          this.router.navigate(['/editor/' + (newTemplate?.id ?? '')]);
        }
      });
  }

  updateTemplate(template: TemplateData, name: string, date?: Date) {
    const temp = Object.assign({}, template, { name, date });
    return this.dataService.upsertTemplate(temp);
  }

  createNewDocument(templates: TemplateData[]) {
    const maxName = templates.length + 1;
    this.dialog
      .open<CreateDocumentDialogComponent>(CreateDocumentDialogComponent, {
        width: '500px',
        data: {
          template: { name: maxName },
        },
      })
      .afterClosed()
      .subscribe(({ name, date }) => {
        if (name && date) {
          const newTemplate = this.updateTemplate({}, name, date);
          this.router.navigate(['/editor/' + (newTemplate?.id ?? '')]);
        }
      });
  }
}
