import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.dev';
import { Area } from '../../models/area';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  readonly API = environment.config.endpoints.API;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  listArea(): Observable<Area[]> {
    const ENDPOINT = `${this.API}/area/list`;
    return this.http.get<Area[]>(ENDPOINT)
      .pipe(map((response: any) => response.data.Items));
  }
}
