import {
    HttpClientTestingModule,
    HttpTestingController,
  } from '@angular/common/http/testing'
  import { TestBed } from '@angular/core/testing'
  import { AreaService } from './area.service'
  import { environment } from 'src/environments/environment'
  import { Area } from 'src/app/models/area'
  
  describe('AreaService', () => {
    let service: AreaService
    let httpMock: HttpTestingController
    const areas: Area[] = [
      {
        id: '4adc795a-c342-45e6-bdaa-988cae050ceb',
        type: 'area',
        name: 'Ingenieria de Software',
      },
      {
        id: '4adc795a-c342-45e6-bdaa-988cae050ceb',
        type: 'area',
        name: 'Devops',
      },
    ]
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [AreaService],
      })
  
      service = TestBed.inject(AreaService)
      httpMock = TestBed.inject(HttpTestingController)
    })
  
    afterEach(() => {
      httpMock.verify()
    })
  
    it('should list all areas', () => {
      service.listArea().subscribe((response) => {
        expect(response).toEqual(areas)
      })
      const req = httpMock.expectOne(
        `${environment.config.endpoints.API}/area/list`,
      )
      expect(req.request.method).toBe('GET')
      req.flush({ data: { Items: areas } })
    })
  })