import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditableModule } from '@ngneat/edit-in-place';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InlineEditComponent } from './components/inline-edit/inline-edit.component';
import { SelectAllComponent } from './components/select-all/select-all.component';
import { AgendaDialogComponent } from './dialogs/agenda-dialog/agenda-dialog.component';
import { PeopleDialogComponent } from './dialogs/people-dialog/people-dialog.component';
import { MainEditorComponent } from './main-editor/main-editor.component';
import { PreviewComponent } from './preview/preview.component';
import { stateReducer } from './store/reducers';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const dbConfig: DBConfig = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [
    {
      store: 'people',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'email', keypath: 'email', options: { unique: false } },
      ],
    },
  ],
};

@NgModule({
  declarations: [
    AppComponent,
    MainEditorComponent,
    SelectAllComponent,
    PreviewComponent,
    PeopleDialogComponent,
    AdminPageComponent,
    AgendaDialogComponent,
    InlineEditComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatTableModule,
    MatCardModule,
    MatListModule,
    AppRoutingModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    EditableModule,
    MatSidenavModule,
    StoreModule.forRoot({ state: stateReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    NgxIndexedDBModule.forRoot(dbConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
