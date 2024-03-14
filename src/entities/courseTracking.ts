enum EStatus {
  "inProgress" = "inProgress",
  "completed" = "completed",
}

export interface ICourseTracking {
  _id: string;
  courseId: string;
  userId: string;
  modules: [
    {
      moduleNo: string;
      videos: {
        videoNo: string;
        currentPosition: string;
        completed: EStatus;
      };
      completed: EStatus;
    }
  ];
}
