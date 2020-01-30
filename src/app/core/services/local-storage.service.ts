import { Injectable } from '@angular/core';
import {StorageKey} from '../../shared/storage-keys';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor () {}

  public get<T> (key: StorageKey): T {
    const data = localStorage.getItem(key);

    return (data) ? JSON.parse(data) : null;
  }

  public set (key: StorageKey, data: any) {
    const body = JSON.stringify(data);
    localStorage.setItem(key, body);
  }

  public remove (key: StorageKey) {
    localStorage.removeItem(key);
  }

  public clear () {
    localStorage.clear();
  }
}
