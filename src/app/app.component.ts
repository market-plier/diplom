import { Component } from '@angular/core';
import { TemplateData } from './api/contracts/templateData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  templateData: TemplateData = {};

  title = 'diplom';

  onPreview(data: TemplateData) {
    this.templateData = data;
  }
}
