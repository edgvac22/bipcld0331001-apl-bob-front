import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Issue } from '../../models/issue';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  readonly API = environment.config.endpoints.API;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  listIssue(): Observable<Issue[]> {
    const ENDPOINT = `${this.API}/issue/list`;
    return this.http.get<Issue[]>(ENDPOINT)
      .pipe(map((response: any) => response.data.Items));
  }

  getIssue(issueId: string) {
    const ENDPOINT = `${this.API}/issue/${issueId}`;
    return this.http.get<Issue[]>(ENDPOINT)
      .pipe(map((response: any) => response.data.Item));
  }
}
