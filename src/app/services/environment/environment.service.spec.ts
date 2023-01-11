import {
    HttpClientTestingModule,
    HttpTestingController,
  } from '@angular/common/http/testing'
  import { TestBed } from '@angular/core/testing'
  import { EnvironmentService } from './environment.service'
  import { environment } from 'src/environments/environment'
  import { Environment } from 'src/app/models/environment'
  
  describe('AreaService', () => {
    let service: EnvironmentService
    let httpMock: HttpTestingController
    const environments: Environment[] = [
      {
        id: '4adc795a-c342-45e6-bdaa-988cae050ceb',
        type: 'environment',
        name: 'Desarrollo',
      },
      {
        id: '4adc795a-c342-45e6-bdaa-988cae050ceb',
        type: 'environment',
        name: 'Calidad',
      },
    ]
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [EnvironmentService],
      })
  
      service = TestBed.inject(EnvironmentService)
      httpMock = TestBed.inject(HttpTestingController)
    })
  
    afterEach(() => {
      httpMock.verify()
    })
  
    it('should list all environments', () => {
      service.listEnvironment().subscribe((response) => {
        expect(response).toEqual(environments)
      })
      const req = httpMock.expectOne(
        `${environment.config.endpoints.API}/environment/list`,
      )
      expect(req.request.method).toBe('GET')
      req.flush({ data: { Items: environments } })
    })
  })