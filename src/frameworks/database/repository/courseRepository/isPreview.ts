import courseModel from "../../models/courseModel";

export const isPreview = async (
  courseId: string,
  moduleNo: string,
  videoNo: string
): Promise<boolean> => {
  try {
   

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
    });
    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};
