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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addModuleVideos = void 0;
const courseModel_1 = __importDefault(require("../../models/courseModel"));
const addModuleVideos = (data, instructor) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("data from course repository data", data);
        let dbResult = yield courseModel_1.default.findOne({
            instructor,
            submissionStatus: "work-in-progress",
        });
        if (dbResult) {
            if (!dbResult.modules.length) {
                const details = {
                    moduleNo: data.moduleNo,
                    moduleTittle: data.moduleTittle,
                    videos: [
                        {
                            videoNo: data.videoNo,
                            videoTittle: data.videoTittle,
                            videoUrl: data.videoUrl,
                            preview: data.preview,
                        },
                    ],
                };
                dbResult.modules.push(details);
            }
            else {
                const moduleIndex = dbResult.modules.findIndex((item) => item.moduleNo === data.moduleNo);
                const moduleTittleIndex = dbResult.modules.findIndex((item) => item.moduleTittle === data.moduleTittle);
                if (moduleIndex > -1 && moduleTittleIndex > -1) {
                    dbResult.modules[moduleTittleIndex].videos.push({
                        videoNo: data.videoNo,
                        videoTittle: data.videoTittle,
                        videoUrl: data.videoUrl,
                        preview: data.preview,
                    });
                }
                else {
                    if (moduleIndex > -1 && !(moduleTittleIndex > -1))
                        return {
                            status: 400,
                            message: "module already exist",
                        };
                    const details = {
                        moduleNo: data.moduleNo,
                        moduleTittle: data.moduleTittle,
                        videos: [
                            {
                                videoNo: data.videoNo,
                                videoTittle: data.videoTittle,
                                videoUrl: data.videoUrl,
                                preview: data.preview,
                            },
                        ],
                    };
                    dbResult.modules.push(details);
                }
            }
            try {
                const upsert = yield courseModel_1.default.findOneAndReplace({
                    instructor,
                    submissionStatus: "work-in-progress",
                }, dbResult);
                if (upsert)
                    return {
                        status: 200,
                        message: "course has been updated",
                        data: dbResult,
                    };
            }
            catch (error) {
                console.error("Error saving to the database:", error);
                return {
                    status: 500,
                    message: "Internal Server Error",
                };
            }
        }
        return { status: 404, message: "course has been updated" };
    }
    catch (error) {
        throw error;
    }
});
exports.addModuleVideos = addModuleVideos;
//# sourceMappingURL=addModuleVideos.js.map