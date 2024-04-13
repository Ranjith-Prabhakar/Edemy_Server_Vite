import { ICloudStorageResponse } from "../../useCasese/interface/request_And_Response/cloudStorageResponse";
import { ICloudStorage } from "../../useCasese/interface/services/cloudStorage";
export declare class CloudStorage implements ICloudStorage {
    addFileToCloud(fileName: string, contentType: string, userId: string, folderName: string): Promise<string | void>;
    getVideoPresignedUrl(courseName: string): Promise<void | ICloudStorageResponse>;
}
