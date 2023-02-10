import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

@Injectable({
    providedIn: 'root'
})
export class UserRoleService {
    isAdmin: boolean;
    isDeveloper: boolean;

    constructor(private http: HttpClient) { }

    getGroups() {
        this.http.get(`${GRAPH_ENDPOINT}/memberOf`)
            .subscribe((groups: any) => {
                const groupIds = groups.value.map((group: any) => group.id);
                this.isAdmin = groupIds.includes('2f2f26ca-f3ed-44bd-a449-983149b1b14a');
                this.isDeveloper = groupIds.includes('cb9f89c1-953a-4f37-a77f-eccc5568ca48');
            });
    }
}