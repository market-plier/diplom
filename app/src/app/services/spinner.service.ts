import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  isLoading = false;
  constructor() {}
  set loading(value: boolean) {
    this.isLoading = value;
  }
}
