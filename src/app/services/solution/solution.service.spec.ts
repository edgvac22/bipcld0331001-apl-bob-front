import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { SolutionService } from './solution.service'
import { environment } from 'src/environments/environment'
import { createSolution, solutions, solution } from 'src/app/shared/mocks/solution-data.mock'

describe('IssueService', () => {
    let service: SolutionService
    let httpMock: HttpTestingController
    let issueId: 'ce0b141a-b0bd-4c79-8f66-8f622051c7e9'
    let solutionId: '61121cdf-991e-4a1e-b920-f1234a502ab0'
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SolutionService],
        })

        service = TestBed.inject(SolutionService)
        httpMock = TestBed.inject(HttpTestingController)
    })

    afterEach(() => {
        httpMock.verify()
    })

    it('should create solution', () => {
        service.addSolution(issueId, createSolution).subscribe((response) => {
            expect(response).toEqual(createSolution)
        })
        const req = httpMock.expectOne(
            `${environment.config.endpoints.API}/solution/${issueId}/new`,
        )
        expect(req.request.method).toBe('POST')
        req.flush(createSolution)
    })

    it('should update solution', () => {
        service.updateSolution(issueId, createSolution).subscribe((response) => {
            expect(response).toEqual(createSolution)
        })
        const req = httpMock.expectOne(
            `${environment.config.endpoints.API}/solution/${issueId}/update`,
        )
        expect(req.request.method).toBe('POST')
        req.flush(createSolution)
    })

    it('should remove solution', () => {
        service.removeSolution(issueId).subscribe((response) => {
            expect(response).toEqual([])
        })
        const req = httpMock.expectOne(
            `${environment.config.endpoints.API}/solution/${issueId}/remove`,
        )
        expect(req.request.method).toBe('POST')
        req.flush([])
    })

    it('should list all solutions', () => {
        service.listSolution().subscribe((response) => {
            expect(response).toEqual(solutions)
        })
        const req = httpMock.expectOne(
            `${environment.config.endpoints.API}/solution/list`,
        )
        expect(req.request.method).toBe('GET')
        req.flush({ data: { Items: solutions } })
    })

    it('should get the details of a solution', () => {
        service.detailSolution(solutionId).subscribe((response: any) => {
            expect(response).toEqual(solution)
        })

        const req = httpMock.expectOne(
            `${environment.config.endpoints.API}/solution/${solutionId}`,
        )
        expect(req.request.method).toBe('GET')
        req.flush({ data: { Items: [solution] } })
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
        service
            .uploadSolutionFile(fileList as any, issueId)
            .subscribe((response) => {
                expect(response).toEqual({ status: 200 })
            })
        const req = httpMock.expectOne(
            `${environment.config.endpoints.FILE_API}/solution/file/${issueId}`,
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
        service
            .uploadSolutionFile(fileList as any, issueId)
            .subscribe((response) => {
                expect(response).toEqual('El tamaño de archivo supera al máximo')
            })
        const req = httpMock.expectOne(
            `${environment.config.endpoints.FILE_API}/solution/file/${issueId}`,
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
        service
            .uploadSolutionFile(fileList as any, issueId)
            .subscribe((response) => {
                expect(response).toEqual(404)
            })
        const req = httpMock.expectOne(
            `${environment.config.endpoints.FILE_API}/solution/file/${issueId}`,
        )
        req.error(new ErrorEvent('file size error'), { status: 404 })
    })

    it('should return image files', () => {
        const imageFiles: any[] = [
            {
                issueId: 'ce0b141a-b0bd-4c79-8f66-8f622051c7e9',
                name: 'image1.png',
                url: 'image1_url',
            },
            {
                issueId: 'ce0b141a-b0bd-4c79-8f66-8fakjasdn1c7e91a',
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
            `${environment.config.endpoints.FILE_API}/solution/image/ce0b141a-b0bd-4c79-8f66-8f622051c7e9`,
        )
        expect(req.request.method).toBe('GET')
        req.flush(imageFiles)
    })

    it('should call verifyCountObjectFile and return the count object file', () => {
        const countObjectFile = [{ count: 2 }]
        service.verifyCountObjectFile('1').subscribe((res) => {
            expect(res).toEqual(countObjectFile)
        })
        const req = httpMock.expectOne(`${service.FILE_API}/solution/count/1`)
        expect(req.request.method).toBe('GET')
        req.flush(countObjectFile)
    })
})