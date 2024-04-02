import { ICourse } from "../../../entities/course";
import { INotificationRepository } from "../../../useCasese/interface/repository/notificationRepository";
import { INotificationResponse } from "../../../useCasese/interface/request_And_Response/notification";
import notificationModel from "../models/notificationModel";

export class NotificationRepository implements INotificationRepository {
  async addNotification(
    userId: string,
    key: string,
    value?: ICourse
  ): Promise<boolean | void> {
    try {
      console.log("key,userid,value", key, userId, value);
      if (value) {
        console.log("inside value", value);

        // if the field to update is new course updates for every user
        const result = await notificationModel.findOneAndUpdate(
          { userId },
          { $addToSet: { [key]: value } }
        );
        if (result) return true;
        else false;
      } else {
        console.log("inside no value");
        const result = await notificationModel.findOneAndUpdate(
          { userId },
          { [key]: true },
          { upsert: true, new: true }
        );
        console.log("inside no value result", result);
        if (result) return true;
        else false;
      }
    } catch (error) {
      throw error;
    }
  }

  //
  async getNotifications(
    userId: string
  ): Promise<void | INotificationResponse> {
    try {
      const result = await notificationModel.findOne({ userId });
      if (result) {
        return {
          success: true,
          message: "notifications has found",
          data: result,
        };
      } else {
        return {
          success: false,
          message: "there is no notifications",
        };
      }
    } catch (error) {
      throw error;
    }
  }
  //
  async updateNotifications(
    notificationHead: string,
    userId: string
  ): Promise<void | { success: boolean; message: string }> {
    try {
      const result = await notificationModel.updateOne(
        { userId: userId },
        { $set: { [notificationHead]: false } }
      );
      if (result) {
        return { success: true, message: "notification has been updated" };
      }else{
        return {success:false,message:"notification hasn`t been updated"}
      }
    } catch (error) {
      throw error;
    }
  }
  //
}
