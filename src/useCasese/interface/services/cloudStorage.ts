import { ICloudStorageResponse } from "../request_And_Response/cloudStorageResponse";

export interface ICloudStorage {
  addModule(
    fileName: string,
    contentType: string,
    userId: string
  ): Promise<string | void>;
  getVideoPresignedUrl(courseName:string): Promise<ICloudStorageResponse | void>;
}