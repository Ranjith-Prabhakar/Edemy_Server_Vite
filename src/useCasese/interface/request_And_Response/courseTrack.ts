
export interface ICourseTrackResponse{
  success:boolean,
  message:string
}

export interface ICourseTrackRequest {
  userId: string;
  courseId: string;
  moduleNo: string;
  moduleTittle: string;
  videoNo: string;
  videoTittle: string;
  position: string;
  complete: "inProgress" | "completed";
}