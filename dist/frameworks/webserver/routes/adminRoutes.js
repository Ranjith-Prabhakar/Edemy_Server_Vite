"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoute = void 0;
const auth_1 = require("../middlewares/auth");
const catchAsyncErrors_1 = require("../middlewares/catchAsyncErrors");
const injuctions_1 = require("./injections/injuctions");
const adminRoute = (router) => {
    /////////
    router.post("/instructor_approval_or_reject", auth_1.isAuthenticated, (0, auth_1.autheriseRoles)("admin"), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.approveOrRejectInstructor(req, res, next);
    }));
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888
    router.get("/get_instructor_request", auth_1.isAuthenticated, (0, auth_1.autheriseRoles)("admin"), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.instructorRequests(req, res, next);
    }));
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888
    router.get("/get_users", auth_1.isAuthenticated, (0, auth_1.autheriseRoles)("admin"), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.getUsers(req, res, next);
    }));
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888
    router.get("/user/:id", auth_1.isAuthenticated, (0, auth_1.autheriseRoles)("admin"), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.getUser(req, res, next);
    }));
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888
    router.post("/freezUser/:id", auth_1.isAuthenticated, (0, auth_1.autheriseRoles)("admin"), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.freezUser(req, res, next);
    }));
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888
    router.post("/unFreezUser/:id", auth_1.isAuthenticated, (0, auth_1.autheriseRoles)("admin"), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.unFreezUser(req, res, next);
    }));
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888
    router.get("/get_instructors", auth_1.isAuthenticated, (0, auth_1.autheriseRoles)("admin"), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.getInstructors(req, res, next);
    }));
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888
    router.post("/add_category", auth_1.isAuthenticated, (0, auth_1.autheriseRoles)("admin"), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.addCategory(req, res, next);
    }));
    router.get("/get_categories", auth_1.isAuthenticated, (0, auth_1.autheriseRoles)("admin"), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.getCategories(req, res, next);
    }));
    router.post("/freezCategory/:id", auth_1.isAuthenticated, (0, auth_1.autheriseRoles)("admin"), (req, res, next) => {
        injuctions_1.adminController.freezCategory(req, res, next);
    });
    router.post("/unFreezCategory/:id", auth_1.isAuthenticated, (0, auth_1.autheriseRoles)("admin"), (req, res, next) => {
        injuctions_1.adminController.unFreezCategory(req, res, next);
    });
    return router;
};
exports.adminRoute = adminRoute;
//# sourceMappingURL=adminRoutes.js.map