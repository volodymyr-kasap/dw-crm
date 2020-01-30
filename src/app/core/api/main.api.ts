import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PromoItem} from '../../models/promo.model';
import {Observable} from 'rxjs';
import {Country} from '../../models/country.models';

@Injectable({ providedIn: 'root' })
export class MainApi {
  constructor(
    private http: HttpClient
  ) { }

  getPromo(): Observable<PromoItem[]> {
    return this.http.get<PromoItem[]>(`promos`);
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`countries`);
  }

}
