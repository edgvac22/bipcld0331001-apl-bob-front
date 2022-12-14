import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Solution } from '../../models/solution';
import { Express } from 'express';

@Injectable({
    providedIn: 'root',
})
export class SolutionService {
    readonly API = environment.config.endpoints.API;
    readonly FILE_API = environment.config.endpoints.FILE_API;

    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    listSolution(): Observable<Solution[]> {
        const ENDPOINT = `${this.API}/solution/list`;
        return this.http.get<Solution[]>(ENDPOINT, this.httpOptions)
            .pipe(map((response: any) => response.data.Items));
    }

    removeSolution(issueId: string) {
        const ENDPOINT = `${this.API}/solution/remove/${issueId}`;
        return this.http.post(ENDPOINT, issueId, this.httpOptions)
            .pipe(map((response) => response));
    }

    uploadSolutionFile(file: File) {
        const formData: FormData = new FormData();
        formData.append('files[]', file, file.name);
        const ENDPOINT = `${this.FILE_API}/solution/file/upload`;
        return this.http.post(ENDPOINT, formData,).pipe(map((response) => response))
    }
}
