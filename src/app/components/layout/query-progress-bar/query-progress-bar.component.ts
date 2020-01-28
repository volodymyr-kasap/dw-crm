import { Component, OnInit } from '@angular/core';
import * as indexReducer from '../../../store';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-query-progress-bar',
  templateUrl: './query-progress-bar.component.html',
  styleUrls: ['./query-progress-bar.component.scss']
})
export class QueryProgressBarComponent implements OnInit {

  public isLoading: boolean;

  constructor(
    private store: Store<indexReducer.State>
  ) {
    this.store.select(state => state.application.queryProgressBar).subscribe(value => {
      this.isLoading = value;
      console.log(this.isLoading);
    });
  }

  ngOnInit() {
  }

}
