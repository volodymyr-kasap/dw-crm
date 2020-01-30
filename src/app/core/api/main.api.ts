import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PromoItem} from '../../models/promo.model';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MainApi {
  constructor(
    private http: HttpClient
  ) { }

  getPromo(): Observable<PromoItem[]> {
    return this.http.get<PromoItem[]>(`promos`);
  }

}
