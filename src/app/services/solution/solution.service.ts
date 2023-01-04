import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Solution } from '../../models/solution';
import { CreateSolution } from 'src/app/models/create-solution';
import { CountObjectFile } from 'src/app/models/count-object-file';

@Injectable({
    providedIn: 'root',
})
export class SolutionService {
    errorMsg!: string;

    readonly API = environment.config.endpoints.API;
    readonly FILE_API = environment.config.endpoints.FILE_API;

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

    listSolution(): Observable<Solution[]> {
        const ENDPOINT = `${this.API}/solution/list`;
        return this.http.get<Solution[]>(ENDPOINT, this.httpOptionsWithCache)
            .pipe(map((response: any) => response.data.Items));
    }

    removeSolution(issueId: string) {
        const ENDPOINT = `${this.API}/solution/${issueId}/remove`;
        return this.http.post(ENDPOINT, issueId)
            .pipe(map((response) => response));
    }

    addSolution(issueId: string, solution: CreateSolution) {
        const ENDPOINT = `${this.API}/solution/${issueId}/new`;
        return this.http.post(ENDPOINT, solution, this.httpOptions)
            .pipe(map((response) => response));
    }

    updateSolution(issueId: string, solution: CreateSolution) {
        const ENDPOINT = `${this.API}/solution/${issueId}/update`;
        return this.http.post(ENDPOINT, solution, this.httpOptions)
            .pipe(map((response) => response));
    }

    detailSolution(solutionId: string) {
        const ENDPOINT = `${this.API}/solution/${solutionId}`;
        return this.http.get(ENDPOINT, this.httpOptions)
            .pipe(map((response) => response));
    }

    uploadSolutionFile(files: FileList, issueId: string) {
        const formData: FormData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i], files[i].name);
        }
        const ENDPOINT = `${this.FILE_API}/solution/file/${issueId}`;
        return this.http.post(ENDPOINT, formData).pipe(map((response) => response))
            .pipe(catchError((error) => {
                if (error.status === 413) {
                    return of(this.errorMsg = `El tamaño de archivo supera al máximo`);
                }
                return of(error.status);
            }),
        )
    }

    verifyCountObjectFile(issueId: string) {
        const ENDPOINT = `${this.FILE_API}/solution/count/${issueId}`;
        return this.http.get<CountObjectFile[]>(ENDPOINT, this.httpOptions)
            .pipe(map((response: any) => response));
    }

    getImageFiles(issueId: string) {
        const ENDPOINT = `${this.FILE_API}/solution/image/${issueId}`;
        return this.http.get<any[]>(ENDPOINT, this.httpOptions)
        .pipe(map((response: any) => response));
    }
}
