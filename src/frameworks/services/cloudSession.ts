import { IUser } from "../../entities/user";
import { ICloudSession } from "../../useCasese/interface/services/cloudSession";
import {redis} from '../../index'

export class CloudSession implements ICloudSession{
  // **********************************************************************************************
  async createUserSession(id: string, user: IUser): Promise<string> {
      const result = await redis.set(id,JSON.stringify(user));
      return result
    }
  // **********************************************************************************************
  async clearUserSession(id: string): Promise<number> {
    const result = await redis.del(id)
    return result
  }

}