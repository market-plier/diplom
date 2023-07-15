import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { MainEditorComponent } from './main-editor/main-editor.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PreviewComponent } from './preview/preview.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: 'editor/:id', component: MainEditorComponent },
  { path: 'preview', component: PreviewComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
  { path: '404', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
