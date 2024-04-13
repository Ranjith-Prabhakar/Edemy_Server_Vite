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
exports.CourseTrackRepository = void 0;
const courseTrackingModel_1 = __importDefault(require("../models/courseTrackingModel"));
class CourseTrackRepository {
    setVideoTracking(videoData) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, courseId, moduleNo, moduleTittle, videoNo, videoTittle, position, complete, } = videoData;
                const isCourseExist = yield courseTrackingModel_1.default.findOne({
                    courseId,
                    userId,
                });
                if (isCourseExist) {
                    console.log("isCourseExist");
                    //if course for this user already added into the tracking
                    const isModuleExist = (_a = isCourseExist.modules) === null || _a === void 0 ? void 0 : _a.find((module) => module.moduleNo === moduleNo.toString());
                    if (isModuleExist) {
                        console.log("isModuleExist");
                        // if the module exist already
                        const isVideoExist = isModuleExist.videos.some((video) => video.videoNo === videoNo.toString());
                        if (isVideoExist) {
                            console.log("isVideoExist");
                            // if the video also exist already in the list then update
                            const updateResult = yield courseTrackingModel_1.default.findOneAndUpdate({
                                courseId,
                                userId,
                                "modules.moduleNo": moduleNo,
                                "modules.moduleTittle": moduleTittle,
                                "modules.videos.videoNo": videoNo,
                                "modules.videos.videoTittle": videoTittle,
                            }, {
                                $set: {
                                    // "modules.$.moduleNo.$.videos.currentPosition": position,
                                    // "modules.$.moduleNo.$.videos.completed": complete,
                                    "modules.$.videos.$[video].currentPosition": position,
                                    "modules.$.videos.$[video].completed": complete,
                                },
                            }, {
                                arrayFilters: [{ "video.videoNo": videoNo }],
                                new: true,
                            });
                            console.log("updateResult", updateResult);
                        }
                        else {
                            // if the video not exist in the list add it
                            console.log("isVideoExist false");
                            const updateVideo = yield courseTrackingModel_1.default.updateOne({
                                courseId,
                                "modules.moduleNo": moduleNo,
                                "modules.moduleTittle": moduleTittle,
                            }, {
                                $addToSet: {
                                    videos: [
                                        {
                                            videoNo,
                                            videoTittle,
                                            currentPosition: position,
                                            completed: complete,
                                        },
                                    ],
                                },
                            });
                            console.log("isVideoExist false updateVideo", updateVideo);
                        }
                    }
                    else {
                        // if the module not added to the video list
                        console.log("isModuleExist false");
                        const updateModule = yield courseTrackingModel_1.default.updateOne({ courseId }, {
                            $addToSet: {
                                modules: {
                                    moduleNo,
                                    moduleTittle,
                                    videos: [
                                        {
                                            videoNo,
                                            videoTittle,
                                            currentPosition: position,
                                            completed: complete,
                                        },
                                    ],
                                },
                            },
                        });
                    }
                }
                else {
                    //if course for this user not added into the tracking already
                    console.log("isCourseExist false");
                    const createResult = yield courseTrackingModel_1.default.create({
                        courseId,
                        userId,
                        modules: [
                            {
                                moduleNo,
                                moduleTittle,
                                videos: {
                                    videoNo,
                                    videoTittle,
                                    currentPosition: position,
                                    completed: complete,
                                },
                            },
                        ],
                    });
                    console.log("createResult 2222222222", createResult);
                }
                //       "modules.moduleNo": moduleNo,
                //       "modules.moduleTittle": moduleTittle,
                //       "modules.videos.videoNo": videoNo,
                //       "modules.videos.videoTittle": videoTittle,
            }
            catch (error) {
                throw error;
            }
        });
    }
    getVideoTracking(courseId, userId, moduleNo, videoNo) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const document = yield courseTrackingModel_1.default.findOne({
                    courseId,
                    userId,
                    "modules.moduleNo": moduleNo,
                    "modules.videos.videoNo": videoNo,
                });
                console.log("document", document);
                const position = (_c = (_b = (_a = document === null || document === void 0 ? void 0 : document.modules) === null || _a === void 0 ? void 0 : _a.find((module) => module.moduleNo === moduleNo.toString())) === null || _b === void 0 ? void 0 : _b.videos.find((video) => video.videoNo === videoNo.toString())) === null || _c === void 0 ? void 0 : _c.currentPosition;
                console.log("position @@@@ #", position);
                return { position: position };
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.CourseTrackRepository = CourseTrackRepository;
//# sourceMappingURL=coursTrackRepository.js.map