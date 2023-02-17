import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.dev';

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
                this.isAdmin = groupIds.includes(environment.config.isAdmin);
                this.isDeveloper = groupIds.includes(environment.config.isDeveloper);
            });
    }
}