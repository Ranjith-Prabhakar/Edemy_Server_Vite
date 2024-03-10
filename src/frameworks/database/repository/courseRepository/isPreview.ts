import courseModel from "../../models/courseModel";

export const isPreview = async (
  courseId: string,
  moduleNo: string,
  videoNo: string
): Promise<boolean> => {
  try {
    console.log(
      "get_video_for_users repo engine",
      `modules.${moduleNo}.videos.${videoNo}`
    );

    const result = await courseModel.findOne({
      _id: courseId,
      modules: {
        $elemMatch: {
          moduleNo: moduleNo,
          videos: {
            $elemMatch: {
              videoNo: videoNo,
              preview: true,
            },
          },
        },
      },
      // [`modules.${moduleNo}.videos.${videoNo}`]:true,
    });
    console.log("get_video_for_users repo engine", result);
    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("get_video_for_users repo engine errro", error);
    throw error;
  }
};
