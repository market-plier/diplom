import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { Store } from '@ngrx/store';
import { AgendaApiActions } from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'diplom';

  constructor(private dataService: DataService, private store: Store) {}

  ngOnInit() {
    this.dataService
      .getAgenda()
      .subscribe((value) =>
        this.store.dispatch(
          AgendaApiActions.retrievedAgendas({ agendas: value })
        )
      );
  }
}
