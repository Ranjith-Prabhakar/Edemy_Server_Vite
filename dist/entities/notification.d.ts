import { ICourse } from "./course";
export declare enum ENotification {
    "instructorRequests" = "instructorRequests",
    "instructorRequestApproval" = "instructorRequestApproval",
    "courseApprovalRequest" = "courseApprovalRequest",
    "courseApprovalApprovance" = "courseApprovalApprovance",
    "broadCasting" = "broadCasting"
}
export interface INotification {
    _id: string;
    userId: string;
    instructorRequests?: boolean;
    instructorRequestApproval?: boolean;
    courseApprovalRequest?: boolean;
    courseApprovalApprovance?: boolean;
    broadCasting?: ICourse[];
}
