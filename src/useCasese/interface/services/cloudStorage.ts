export interface ICloudStorage {
  addModule(
    fileName: string,
    contentType: string,
    userId: string
  ): Promise<string | void>;
}