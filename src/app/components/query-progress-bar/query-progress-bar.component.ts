import { Component, OnInit } from '@angular/core';
import * as indexReducer from '../../store';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-query-progress-bar',
  templateUrl: './query-progress-bar.component.html',
  styleUrls: ['./query-progress-bar.component.scss']
})
export class QueryProgressBarComponent implements OnInit {

  public isLoading$: Observable<boolean>;

  constructor(
    private store: Store<indexReducer.State>
  ) {
    this.isLoading$ = store.pipe(select(state => state.application.showQueryProgressBar));
  }

  ngOnInit() {
  }

}
