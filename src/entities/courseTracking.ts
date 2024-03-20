export enum EStatus {
  "notOpened" = "notOpened",
  "inProgress" = "inProgress",
  "completed" = "completed",
}

export interface ICourseTracking {
  _id: string;
  courseId: string;
  userId: string;
  modules?: [
    {
      moduleNo: string;
      moduleTittle: string;
      videos: [{
        videoNo: string;
        videoTittle: string;
        currentPosition: string;
        completed: EStatus;
      }];
    }
  ];
}
