"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRoute = void 0;
const injuctions_1 = require("./injections/injuctions");
const auth_1 = require("../middlewares/auth");
const catchAsyncErrors_1 = require("../middlewares/catchAsyncErrors");
function courseRoute(router) {
    router.get("/get_course_in_progress", auth_1.isAuthenticated, (0, auth_1.autheriseRoles)("instructor"), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.courseController.getCourseInProgress(req, res, next);
    }));
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    router.post("/addCourseData", auth_1.isAuthenticated, (0, auth_1.autheriseRoles)("instructor"), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.courseController.addCourseData(req, res, next); // adds only data but videos
    }));
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    router.post("/addFileToCloud", auth_1.isAuthenticated, (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.courseController.addFileToCloud(req, res, next);
    }));
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    router.post("/updateCourse", auth_1.isAuthenticated, (0, auth_1.autheriseRoles)("instructor"), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.courseController.updateCourse(req, res, next);
    }));
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    router.post("/add_Module_Videos", auth_1.isAuthenticated, (0, auth_1.autheriseRoles)("instructor"), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.courseController.addModuleVideos(req, res, next);
    }));
    router.get("/get_courses", auth_1.isAuthenticated, (0, auth_1.autheriseRoles)("admin"), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.courseController.getCourses(req, res, next);
    }));
    router.get("/get_courses_in_Request", auth_1.isAuthenticated, (0, auth_1.autheriseRoles)("admin"), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.courseController.getCoursesInRequest(req, res, next);
    }));
    router.post("/get_video", auth_1.isAuthenticated, (0, auth_1.autheriseRoles)("admin"), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.courseController.getVideoPresignedUrl(req, res, next);
    }));
    router.post("/approve_or_reject_course", auth_1.isAuthenticated, (0, auth_1.autheriseRoles)("admin"), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.courseController.approveOrRejectVideo(req, res, next);
    }));
    router.get("/get_courses_for_user", 
    // isAuthenticated,
    (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.courseController.getCoursesForUser(req, res, next);
    }));
    router.get("/get_categories", auth_1.isAuthenticated, 
    // autheriseRoles("instructor"),
    (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.courseController.getCategories(req, res, next);
    }));
    router.post("/get_video_for_user", auth_1.isAuthenticated, (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.courseController.getVideoForUser(req, res, next);
    }));
    router.post("/get_video_for_visitors", (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.courseController.getVideoForVisitors(req, res, next);
    }));
    router.post("/enroll_course", auth_1.isAuthenticated, (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.courseController.enrollCourse(req, res, next);
    }));
    router.post("/payment_status", auth_1.isAuthenticated, (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.courseController.paymentStatus(req, res, next);
    }));
    router.post("/update_review_and_rating", auth_1.isAuthenticated, (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.courseController.updateReviewAndRating(req, res, next);
    }));
    router.post("/get_single_course_review_and_rating", (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.courseController.getSingleCourseReviewAndRating(req, res, next);
    }));
    router.post("/get_thumbnail_image_presigned_url", (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.courseController.getThumbnamilImagePresignedUrl(req, res, next);
    }));
    router.post("/get_user_enrolled_courses", auth_1.isAuthenticated, (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.courseController.getUserEnrolledCourses(req, res, next);
    }));
    router.post("/get_courses_by_category", 
    // isAuthenticated,
    (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.courseController.getCourseByCategory(req, res, next);
    }));
    router.post("/get_courses_for_search", (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.courseController.getCourseForSearch(req, res, next);
    }));
    router.post("/get_instructor_tutorials", auth_1.isAuthenticated, (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.courseController.getInstructorTutorials(req, res, next);
    }));
    router.post("/set_video_track", auth_1.isAuthenticated, (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.courseController.setVideoTrack(req, res, next);
    }));
    return router;
}
exports.courseRoute = courseRoute;
//# sourceMappingURL=courseRoute.js.map