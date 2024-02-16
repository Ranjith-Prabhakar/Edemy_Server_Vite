import { IModule } from "../../../../../entities/course";
import { IModuleVideoBody } from "../../../../../useCasese/interface/request/course";
import { ICourseResponse } from "../../../../../useCasese/interface/response/courseResponse";
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
        console.log("data from course repository index", index);
        if (index > -1) {
          console.log(
            "data from course repository if index",
            dbResult.modules[index].videos
          );
          dbResult.modules[index].videos.push({
            videoNo: data.videoNo,
            videoTittle: data.videoTittle,
          });

          console.log(
            "data from course repository if index affter============>",
            dbResult.modules[index].videos
          );
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

      try {
        const upsert = await courseModel.findOneAndReplace(
          {
            instructor,
            submissionStatus: "work-in-progress",
          },
          dbResult
        );
        // const result = await dbResult.save();
        // console.log("dbResult after saving====>", result);
        if (upsert)
          return {
            status: 200,
            message: "course has been updated",
            data: dbResult,
          };
      } catch (error) {
        console.error("Error saving to the database:", error);
        // Handle the error, throw it, or log as needed
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
