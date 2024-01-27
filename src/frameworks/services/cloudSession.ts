import { IUser } from "../../entities/user";
import { ICloudSession } from "../../useCasese/interface/services/cloudSession";
import {redis} from '../../index'

export class CloudSession implements ICloudSession{
  // **********************************************************************************************
  async createUserSession(id: string, user: IUser): Promise<string> {
    console.log("cloudsession=> frame");
      const result = await redis.set(id,JSON.stringify(user));
      console.log("cloudsession=> frame",result)
      return result
    }
  // **********************************************************************************************

}