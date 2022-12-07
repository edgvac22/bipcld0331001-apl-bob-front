import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Solution } from '../../models/solution';

@Injectable({
    providedIn: 'root',
})
export class SolutionService {
    readonly API = environment.config.endpoints.API;

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
}
