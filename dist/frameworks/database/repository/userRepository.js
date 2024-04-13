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
exports.UserRepository = void 0;
const index_1 = require("./user/index");
const index_2 = require("./admin/index");
class UserRepository {
    constructor(userModels) {
        this.userModels = userModels;
    }
    // **************************************************************************************
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExist = yield (0, index_1.fidUserByEmail)(email, this.userModels);
            return userExist;
        });
    }
    // **************************************************************************************
    createUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_1.createUser)(newUser, this.userModels);
        });
    }
    // **************************************************************************************
    findAndUpdate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_1.findAndUpdate)(data, this.userModels);
        });
    }
    ///888888888888888888888888888888888888888888888888888888888888888888888
    findByIdAndUpdate(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_1.findByIdAndUpdate)(id, data);
        });
    }
    ///888888888888888888888888888888888888888888888888888888888888888888888
    getUsers(role) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_2.getUsers)(role);
        });
    }
    ///888888888888888888888888888888888888888888888888888888888888888888888
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_2.getUser)(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    ///888888888888888888888888888888888888888888888888888888888888888888888
    freezUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_2.freezUser)(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    ///888888888888888888888888888888888888888888888888888888888888888888888
    unFreezUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_2.unFreezUser)(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    ///888888888888888888888888888888888888888888888888888888888888888888888
    addEnrolledCourse(courseId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.addEnrolledCourse)(courseId, userId);
            }
            catch (error) {
                throw error;
            }
        });
    }
    ///888888888888888888888888888888888888888888888888888888888888888888888
    updateCourses(courseId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.updateCourses)(courseId, userId);
            }
            catch (error) {
                throw error;
            }
        });
    }
    ///888888888888888888888888888888888888888888888888888888888888888888888
    getAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.getAdmin)();
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=userRepository.js.map