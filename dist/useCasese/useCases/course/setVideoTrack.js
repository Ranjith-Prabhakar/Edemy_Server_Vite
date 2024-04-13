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
exports.setVideoTrack = void 0;
const catchError_1 = require("../../middlewares/catchError");
const setVideoTrack = (courseTrackingRepository, req, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, courseId, moduleNo, moduleTittle, videoNo, videoTittle, position, complete, } = req.body;
        return yield courseTrackingRepository.setVideoTracking({
            userId,
            courseId,
            moduleNo,
            moduleTittle,
            videoNo,
            videoTittle,
            position,
            complete,
        });
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
});
exports.setVideoTrack = setVideoTrack;
//# sourceMappingURL=setVideoTrack.js.map