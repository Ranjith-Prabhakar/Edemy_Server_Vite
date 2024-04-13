import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICloudStorageResponse } from "../../interface/request_And_Response/cloudStorageResponse";
import { ICloudStorage } from "../../interface/services/cloudStorage";
export declare const getThumbnamilImagePresignedUrl: (cloudStorage: ICloudStorage, req: Req, next: Next) => Promise<void | ICloudStorageResponse>;
