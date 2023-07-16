import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComponentNavigationService {
  private activeComponent = 'admin';
  private currentIdSubject = new BehaviorSubject<string | undefined>(undefined);
  currentId$ = this.currentIdSubject.asObservable();

  navigateToComponent(component: string, id?: string) {
    this.activeComponent = component;

    id && this.currentIdSubject.next(id);
  }

  getActiveComponent(): string {
    return this.activeComponent;
  }
}
