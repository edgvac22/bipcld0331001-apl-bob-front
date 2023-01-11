export interface Solution {
    issueId: string;
    issueUser: string;
    area: string;
    environment: string;
    issueDetail: string;
    fileId?: string;
    dateCreate: string;
    verify: string;
    solutionId: string;
    solutionUser: string;
    solutionTitle: string;
    solutionAttachment?: string;
    solutionDetail: string;
    dateUpdated: string;
}