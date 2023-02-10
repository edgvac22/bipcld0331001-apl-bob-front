import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { UserRoleService } from './user-role.service';
const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';
describe('UserRoleService', () => {
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let userRoleService: UserRoleService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        userRoleService = new UserRoleService(httpClientSpy);
    });

    it('should set isAdmin and isDeveloper properties', () => {
        const mockGroups = of({
            value: [
                { id: '2f2f26ca-f3ed-44bd-a449-983149b1b14a' },
                { id: 'cb9f89c1-953a-4f37-a77f-eccc5568ca48' }
            ]
        });
        httpClientSpy.get.and.returnValue(mockGroups);

        userRoleService.getGroups();

        expect(httpClientSpy.get).toHaveBeenCalledWith(`${GRAPH_ENDPOINT}/memberOf`);
        expect(userRoleService.isAdmin).toBe(true);
        expect(userRoleService.isDeveloper).toBe(true);
    });
});