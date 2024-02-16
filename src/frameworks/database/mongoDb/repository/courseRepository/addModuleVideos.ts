import { IModule } from "../../../../../entities/course";
import { IModuleVideoBody } from "../../../../../useCasese/interface/request/course";
import { ICourseResponse } from "../../../../../useCasese/interface/response/courseResponse";
import courseModel from "../../models/courseModel";

export const addModuleVideos = async (
  data: IModuleVideoBody,
  instructor: string
): Promise<ICourseResponse> => {
  try {
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
              videoNo: data.videoNo,
              videoTittle: data.videoTittle,
            },
          ],
        };
        dbResult.modules.push(details as IModule);
      } else {
        const index = dbResult.modules.findIndex(
          (item) => item.moduleTittle === data.moduleTittle
        );
        if (index) {
          dbResult.modules[index].videos.push({
            videoNo: data.videoNo,
            videoTittle: data.videoTittle,
          });
        } else {
          const details = {
            moduleNo: data.moduleNo,
            moduleTittle: data.moduleTittle,
            videos: [
              {
                videoNo: data.videoNo,
                videoTittle: data.videoTittle,
              },
            ],
          };
          dbResult.modules.push(details as IModule);
        }
      }

      await dbResult.save();
      return {
        status: 200,
        message: "course has been updated",
        data: dbResult,
      };
    }
    return { status: 404, message: "course has been updated" };
  } catch (error: any) {
    throw error;
  }
};
