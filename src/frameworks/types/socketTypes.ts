import { Server, Socket } from "socket.io";

import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { ICourse } from "../../entities/course";
import { IInstructorAgreement } from "../../entities/instructorAgreement";

export interface ServerToClientEvents {
  serverSideLogin: (message: string) => void;
  serverSideLogout: (message: string) => void;
  fromServerCourseAdded: (course: ICourse, message: string) => void;
  fromServerInstructorRequestSubmitted:(agreement:IInstructorAgreement)=>void
  fromServerInstrctorRequestApproval:(message:string)=>void
  fromServerCourseApproved:(message:string)=>void
  fromServerCourseApprovedNotificationForAllUsers:(message:string)=>void
}
export interface ClientToServerEvents {
  clientSideLogin: (message: string) => void;
}

//socket server
export type TSocket = Server<
  ServerToClientEvents,
  ClientToServerEvents,
  DefaultEventsMap,
  any
>;
//socket client
export type TSocketMap = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  DefaultEventsMap,
  any
>;
