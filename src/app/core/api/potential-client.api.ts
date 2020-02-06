import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PotentialClient} from '../../models/potential-client.model';

@Injectable()
export class PotentialClientApi {
  constructor(
    private http: HttpClient
  ) { }

  getPotentialClients(): Observable<PotentialClient[]> {
    return this.http.get<PotentialClient[]>(`potentialClients`);
  }

  getManagers(): Observable<any[]> {
    return this.http.get<any[]>(`managers`);
  }



}
