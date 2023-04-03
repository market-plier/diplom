import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainEditorComponent } from './main-editor/main-editor.component';
import { PreviewComponent } from './preview/preview.component';

const routes: Routes = [
  { path: '', redirectTo: '/editor', pathMatch: 'full' },
  { path: 'editor', component: MainEditorComponent },
  { path: 'preview', component: PreviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
