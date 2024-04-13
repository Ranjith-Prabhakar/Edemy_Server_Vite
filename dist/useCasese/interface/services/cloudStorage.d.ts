import { ICloudStorageResponse } from "../request_And_Response/cloudStorageResponse";
export interface ICloudStorage {
    addFileToCloud(fileName: string, contentType: string, userId: string, courseName: string): Promise<string | void>;
    getVideoPresignedUrl(courseName: string): Promise<ICloudStorageResponse | void>;
}
