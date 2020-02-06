import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PotentialClient} from '../../models/potential-client.model';
import {Manager} from '../../models/manager.model';

@Injectable()
export class PotentialClientApi {
  constructor(
    private http: HttpClient
  ) { }

  getPotentialClients(): Observable<PotentialClient[]> {
    return this.http.get<PotentialClient[]>(`potentialClients`);
  }

  getManagers(): Observable<Manager[]> {
    return this.http.get<Manager[]>(`managers`);
  }



}
