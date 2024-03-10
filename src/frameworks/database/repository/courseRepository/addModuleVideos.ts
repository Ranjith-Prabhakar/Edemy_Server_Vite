import { IModule } from "../../../../entities/course";
import { IModuleVideoBody } from "../../../../useCasese/interface/request/course";
import { ICourseResponse } from "../../../../useCasese/interface/request_And_Response/course";
import courseModel from "../../models/courseModel";

export const addModuleVideos = async (
  data: IModuleVideoBody,
  instructor: string
): Promise<ICourseResponse> => {
  try {
    console.log("data from course repository data", data);
    let dbResult = await courseModel.findOne({
      instructor,
      submissionStatus: "work-in-progress",
    });

    if (dbResult) {
      if (!dbResult.modules.length) {
        const details = {
          moduleNo: data.moduleNo,
          moduleTittle: data.moduleTittle,
          videos: [
            {
              videoNo: data.videoNo as string,
              videoTittle: data.videoTittle,
              videoUrl: data.videoUrl,
              preview: data.preview,
            },
          ],
        };
        dbResult.modules.push(details as IModule);
      } else {
        const moduleIndex = dbResult.modules.findIndex(
          (item) => item.moduleNo === data.moduleNo
        );
        const moduleTittleIndex = dbResult.modules.findIndex(
          (item) => item.moduleTittle === data.moduleTittle
        );
        if (moduleIndex > -1 && moduleTittleIndex > -1) {
          dbResult.modules[moduleTittleIndex].videos.push({
            videoNo: data.videoNo,
            videoTittle: data.videoTittle,
            videoUrl: data.videoUrl,
            preview: data.preview,
          });
        } else {
          if (moduleIndex > -1 && !(moduleTittleIndex > -1))
            return {
              status: 400,
              message: "module already exist",
            };
          const details = {
            moduleNo: data.moduleNo,
            moduleTittle: data.moduleTittle,
            videos: [
              {
                videoNo: data.videoNo,
                videoTittle: data.videoTittle,
                videoUrl: data.videoUrl,
                preview: data.preview,
              },
            ],
          };
          dbResult.modules.push(details as IModule);
        }
      }

      try {
        const upsert = await courseModel.findOneAndReplace(
          {
            instructor,
            submissionStatus: "work-in-progress",
          },
          dbResult
        );
        if (upsert)
          return {
            status: 200,
            message: "course has been updated",
            data: dbResult,
          };
      } catch (error) {
        console.error("Error saving to the database:", error);
        return {
          status: 500,
          message: "Internal Server Error",
        };
      }
    }
    return { status: 404, message: "course has been updated" };
  } catch (error: any) {
    throw error;
  }
};
