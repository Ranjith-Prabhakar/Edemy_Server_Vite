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
exports.CourseRepository = void 0;
const index_1 = require("./courseRepository/index");
class CourseRepository {
    constructor() { }
    getCourseInProgress(instructor) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.getCourseInProgress)(instructor);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    addCourseData(courseData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.addCourseData)(courseData);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // async addCourseData(courseData: ICourseRepository): Promise<ICourseResponse> {
    //   try {
    //     return await addCourseData(courseData);
    //   } catch (error: any) {
    //     throw error;
    //   }
    // }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    updateCourse(instructor, datum) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.updateCourse)(instructor, datum);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    addModuleVideos(data, instructor) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.addModuleVideos)(data, instructor);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    findByName(courseName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.findByName)(courseName);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    getCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.getCourses)();
            }
            catch (error) {
                throw error;
            }
        });
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    getCoursesInRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.getCoursesInRequest)();
            }
            catch (error) {
                throw error;
            }
        });
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    approveOrRejectVideo(courseId, action) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.approveOrRejectVideo)(courseId, action);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    getCoursesForUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.getCoursesForUser)();
            }
            catch (error) {
                throw error;
            }
        });
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    isPreview(courseId, moduleNo, videoNo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("get_video_for_users repo ");
                return yield (0, index_1.isPreview)(courseId, moduleNo, videoNo);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    updatePurchas(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.updatePurchas)(courseId);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    getUserEnrolledCourses(courses) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.getUserEnrolledCourses)(courses);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    getCourseByCategory(category, pageNumber, frequency, sort, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.getCourseByCategory)(category, pageNumber, frequency, sort, filter);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    getCourseForSearch(key, pageNumber, frequency, sort, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.getCourseForSearch)(key, pageNumber, frequency, sort, filter);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    getInstructorTutorials(courses) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.getInstructorTutorials)(courses);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.CourseRepository = CourseRepository;
//# sourceMappingURL=courseRepository.js.map