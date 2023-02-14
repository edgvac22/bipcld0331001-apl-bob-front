import {
    HttpClientTestingModule,
    HttpTestingController,
  } from '@angular/common/http/testing'
  import { TestBed } from '@angular/core/testing'
  import { IssueService } from './issue.service'
  import { environment } from '../../../environments/environment.dev'
  import { CreateIssue } from '../../models/create-issue'
  import { issue, issues } from '../../shared/mocks/issue-data.mock'
  
  describe('IssueService', () => {
    let service: IssueService
    let httpMock: HttpTestingController
    let issueId: '61121cdf-991e-4a1e-b920-f0ema123lnz'
    const createIssue: CreateIssue = {
      issueUser: 'edgardo.vaca@banistmo.com',
      area: 'Ingenieria de Software',
      environment: 'Desarrollo',
      issueDetail: 'Estoy teniendo este hallazgo...',
    }
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [IssueService],
      })
  
      service = TestBed.inject(IssueService)
      httpMock = TestBed.inject(HttpTestingController)
    })
  
    afterEach(() => {
      httpMock.verify()
    })
  
    it('should create an issue', () => {
      service.createIssue(createIssue).subscribe((response) => {
        expect(response).toEqual(createIssue)
      })
      const req = httpMock.expectOne(
        `${environment.config.endpoints.API}/issue/new`,
      )
      expect(req.request.method).toBe('POST')
      req.flush(createIssue)
    })
  
    it('should list all issues', () => {
      service.listIssue().subscribe((response) => {
        expect(response).toEqual(issues)
      })
      const req = httpMock.expectOne(
        `${environment.config.endpoints.API}/issue/list`,
      )
      expect(req.request.method).toBe('GET')
      req.flush({ data: { Items: issues } })
    })
  
    it('should get an issue', () => {
      service.getIssue(issueId).subscribe((response) => {
        expect(response).toEqual(issue)
      })
      const req = httpMock.expectOne(
        `${environment.config.endpoints.API}/issue/${issueId}`,
      )
      expect(req.request.method).toBe('GET')
      req.flush({ data: { Item: issue } })
    })
  
    it('should upload files', () => {
      const files = [
        new File(['file content'], 'file1.txt', { type: 'text/plain' }),
      ]
      const fileList = {
        0: files[0],
        1: files[0],
        length: 2,
        item: (index: number) => files[index],
      }
      service.uploadFile(fileList as any).subscribe((response) => {
        expect(response).toEqual({ status: 200 })
      })
      const req = httpMock.expectOne(
        `${environment.config.endpoints.FILE_API}/issue/file`,
      )
      expect(req.request.method).toBe('POST')
      req.flush({ status: 200 })
    })
  
    it('should handle file size error', () => {
      const files = [
        new File(['file content'], 'file1.txt', { type: 'text/plain' }),
      ]
      const fileList = {
        0: files[0],
        1: files[0],
        length: 2,
        item: (index: number) => files[index],
      }
      service.uploadFile(fileList as any).subscribe((response) => {
        expect(response).toEqual('El tamaño de archivo supera al máximo')
      })
      const req = httpMock.expectOne(
        `${environment.config.endpoints.FILE_API}/issue/file`,
      )
      req.error(new ErrorEvent('file size error'), { status: 413 })
    })
  
    it('should handle request error', () => {
      const files = [
        new File(['file content'], 'file1.txt', { type: 'text/plain' }),
      ]
      const fileList = {
        0: files[0],
        1: files[0],
        length: 2,
        item: (index: number) => files[index],
      }
      service.uploadFile(fileList as any).subscribe((response) => {
        expect(response).toEqual(404)
      })
      const req = httpMock.expectOne(
        `${environment.config.endpoints.FILE_API}/issue/file`,
      )
      req.error(new ErrorEvent('file size error'), { status: 404 })
    })
  
    it('should return image files', () => {
      const imageFiles: any[] = [
        {
          fileId: 'ce0b141a-b0bd-4c79-8f66-8f622051c7e9',
          name: 'image1.png',
          url: 'image1_url',
        },
        {
          fileId: 'ce0b141a-b0bd-4c79-8f66-8fakjasdn1c7e9',
          name: 'image2.jpg',
          url: 'image2_url',
        },
      ]
  
      service
        .getImageFiles('ce0b141a-b0bd-4c79-8f66-8f622051c7e9')
        .subscribe((response) => {
          expect(response).toEqual(imageFiles)
        })
  
      const req = httpMock.expectOne(
        `${environment.config.endpoints.FILE_API}/issue/image/ce0b141a-b0bd-4c79-8f66-8f622051c7e9`,
      )
      expect(req.request.method).toBe('GET')
      req.flush(imageFiles)
    })
  })