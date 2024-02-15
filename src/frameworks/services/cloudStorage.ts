import { ICloudStorage } from "../../useCasese/interface/services/cloudStorage";
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require("dotenv").config();

const s3Client = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  },
});

export class CloudStorage implements ICloudStorage {
  async addModule(
    fileName: string,
    contentType: string,
    userId:string
  ): Promise<string | void> {
    try {
      const command = new PutObjectCommand({
        Bucket: "bucket.edemy",
        Key: `uploads/user-uploads/${userId}/${fileName}`,
        ContentType: contentType,
      });
      const url = await getSignedUrl(s3Client, command);
      return url;
    } catch (error: any) {
      throw error;
    }
  }
}
