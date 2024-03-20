import { ICourseTracking } from "../../../entities/courseTracking";
import { ICourseTrackingRepository } from "../../../useCasese/interface/repository/courseTrackingRepository";
import {
  ICourseTrackRequest,
  ICourseTrackResponse,
} from "../../../useCasese/interface/request_And_Response/courseTrack";
import courseTrackingModel from "../models/courseTrackingModel";

export class CourseTrackRepository implements ICourseTrackingRepository {
  async setVideoTracking(
    videoData: ICourseTrackRequest
  ): Promise<void | ICourseTrackResponse> {
    try {
      const {
        userId,
        courseId,
        moduleNo,
        moduleTittle,
        videoNo,
        videoTittle,
        position,
        complete,
      } = videoData;
      const isCourseExist = await courseTrackingModel.findOne({
        courseId,
        userId,
      });

      if (isCourseExist) {
        console.log("isCourseExist");
        //if course for this user already added into the tracking
        const isModuleExist = isCourseExist.modules?.find(
          (module) => module.moduleNo === moduleNo.toString()
        );
        if (isModuleExist) {
          console.log("isModuleExist");
          // if the module exist already
          const isVideoExist = isModuleExist.videos.some(
            (video) => video.videoNo === videoNo.toString()
          );

          if (isVideoExist) {
            console.log("isVideoExist");
            // if the video also exist already in the list then update
            const updateResult = await courseTrackingModel.findOneAndUpdate(
              {
                courseId,
                userId,
                "modules.moduleNo": moduleNo,
                "modules.moduleTittle": moduleTittle,
                "modules.videos.videoNo": videoNo,
                "modules.videos.videoTittle": videoTittle,
              },
              {
                $set: {
                  // "modules.$.moduleNo.$.videos.currentPosition": position,
                  // "modules.$.moduleNo.$.videos.completed": complete,
                  "modules.$.videos.$[video].currentPosition": position,
                  "modules.$.videos.$[video].completed": complete,
                },
              },
              {
                arrayFilters: [{ "video.videoNo": videoNo }],
                new: true,
              }
            );
            console.log("updateResult", updateResult);
          } else {
            // if the video not exist in the list add it
            console.log("isVideoExist false");
            const updateVideo = await courseTrackingModel.updateOne(
              {
                courseId,
                "modules.moduleNo": moduleNo,
                "modules.moduleTittle": moduleTittle,
              },
              {
                $addToSet: {
                  videos: [
                    {
                      videoNo,
                      videoTittle,
                      currentPosition: position,
                      completed: complete,
                    },
                  ],
                },
              }
            );
            console.log("isVideoExist false updateVideo", updateVideo);
          }
        } else {
          // if the module not added to the video list
          console.log("isModuleExist false");
          const updateModule = await courseTrackingModel.updateOne(
            { courseId },
            {
              $addToSet: {
                modules: {
                  moduleNo,
                  moduleTittle,
                  videos: [
                    {
                      videoNo,
                      videoTittle,
                      currentPosition: position,
                      completed: complete,
                    },
                  ],
                },
              },
            }
          );
        }
      } else {
        //if course for this user not added into the tracking already
        console.log("isCourseExist false");
        const createResult = await courseTrackingModel.create({
          courseId,
          userId,
          modules: [
            {
              moduleNo,
              moduleTittle,
              videos: {
                videoNo,
                videoTittle,
                currentPosition: position,
                completed: complete,
              },
            },
          ],
        });
        console.log("createResult 2222222222", createResult);
      }
      //       "modules.moduleNo": moduleNo,
      //       "modules.moduleTittle": moduleTittle,
      //       "modules.videos.videoNo": videoNo,
      //       "modules.videos.videoTittle": videoTittle,
    } catch (error) {
      throw error;
    }
  }

  async getVideoTracking(
    courseId: string,
    userId: string,
    moduleNo: string,
    videoNo: string
  ): Promise<void | { position: string }> {
    try {
      const document = await courseTrackingModel.findOne({
        courseId,
        userId,
        "modules.moduleNo": moduleNo,
        "modules.videos.videoNo": videoNo,
      });
      console.log("document", document);
      const position = document?.modules
        ?.find((module) => module.moduleNo === moduleNo.toString())
        ?.videos.find(
          (video) => video.videoNo === videoNo.toString()
        )?.currentPosition;
      console.log("position @@@@ #", position);

      return { position: position as string };
    } catch (error) {
      throw error;
    }
  }
}
