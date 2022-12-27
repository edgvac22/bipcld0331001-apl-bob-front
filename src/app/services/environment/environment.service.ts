import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Environment } from '../../models/environment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  readonly API = environment.config.endpoints.API;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  listEnvironment(): Observable<Environment[]> {
    const ENDPOINT = `${this.API}/environment/list`;
    return this.http.get<Environment[]>(ENDPOINT)
      .pipe(map((response: any) => response.data.Items));
  }
}
