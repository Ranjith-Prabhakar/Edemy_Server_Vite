export interface ICloudStorageResponse {
  status: number;
  message: string;
  data?: string;
}

export interface IExtendedCloudStorageResponse extends ICloudStorageResponse {
  position?: string;
}
