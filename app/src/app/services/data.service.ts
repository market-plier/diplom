import { Injectable } from '@angular/core';
import { TemplateData } from '../api/contracts/templateData';
import { headerData, protocolData } from '../data/test-data';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  _templateData: TemplateData = { header: headerData, protocol: protocolData };
  get templateData() {
    return this._templateData;
  }
  set templateData(value: TemplateData) {
    this._templateData = value;
  }

  constructor() {
    try {
      this._templateData = (JSON.parse(
        localStorage.getItem('documentData') ?? 'null'
      ) as TemplateData) ?? { header: headerData, protocol: protocolData };
    } catch (error) {
      localStorage.clear();
    }
  }
}
