import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { Issue } from '../../models/issue';
import { CreateIssue } from 'src/app/models/create-issue';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  readonly API = environment.config.endpoints.API;
  readonly FILE_API = environment.config.endpoints.FILE_API;
  errorMsg!: string;
  constructor(private http: HttpClient) { }

  httpOptionsWithCache = {
    headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=86400'
     }),
};

httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

  createIssue(issue: CreateIssue) {
    const ENDPOINT = `${this.API}/issue/new`;
    return this.http.post(ENDPOINT, issue, this.httpOptionsWithCache)
      .pipe(map((response) => response));
  }

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

  uploadFile(files: FileList) {
    const formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name);
    }
    const ENDPOINT = `${this.FILE_API}/issue/file`;
    return this.http.post(ENDPOINT, formData).pipe(map((response) => response))
      .pipe(catchError((error) => {
        if (error.status === 413) {
          return of(this.errorMsg = `El tamaño de archivo supera al máximo`);
        }
        return of(error.status);
      }),
      )
  }

  getImageFiles(fileId: string) {
    const ENDPOINT = `${this.FILE_API}/issue/image/${fileId}`;
    return this.http.get<any[]>(ENDPOINT, this.httpOptions)
    .pipe(map((response: any) => response));
}
}
