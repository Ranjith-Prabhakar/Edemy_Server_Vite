import { IUser } from "../../entities/user";
import { ICloudSession } from "../../useCasese/interface/services/cloudSession";
import { redis } from "../../index";
import { IJsonResponse } from "../../useCasese/interface/services/jsonResponse";

export class CloudSession implements ICloudSession {
  // **********************************************************************************************
  async createUserSession(id: string, user: IUser): Promise<string> {
    const result = await redis.set(id, JSON.stringify(user));
    return result;
  }
  // **********************************************************************************************
  async clearUserSession(id: string): Promise<number> {
    const result = await redis.del(id);
    return result;
  }
  // **********************************************************************************************
  async getUser(id: string): Promise<string | IJsonResponse> {
    const user = await redis.get(id);
    if (!user) {
      return { status: 400, success: false, message: "session has expired" };
    } else {
      return user;
    }
  }
}
