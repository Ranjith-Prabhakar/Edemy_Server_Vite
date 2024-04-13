"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudStorage = void 0;
const { S3Client, PutObjectCommand, GetObjectCommand, } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require("dotenv").config();
const s3Client = new S3Client({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    },
});
class CloudStorage {
    addFileToCloud(fileName, contentType, userId, folderName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const command = new PutObjectCommand({
                    Bucket: "bucket.edemy",
                    Key: `uploads/user-uploads/${userId}/${folderName}/${fileName}`,
                    ContentType: contentType,
                });
                const url = yield getSignedUrl(s3Client, command);
                return url;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getVideoPresignedUrl(courseName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const command = new GetObjectCommand({
                    Bucket: process.env.S3_BOCKET_NAME,
                    Key: `${process.env.S3_COURSE_CONTENT_LOCATION}${courseName}`,
                });
                const url = yield getSignedUrl(s3Client, command);
                if (url) {
                    return { status: 200, message: "video has been fetched", data: url };
                }
                else {
                    throw new Error("video not found");
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.CloudStorage = CloudStorage;
//# sourceMappingURL=cloudStorage.js.map