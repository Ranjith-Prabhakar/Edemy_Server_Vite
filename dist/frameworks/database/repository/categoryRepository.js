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
exports.CategoryRepository = void 0;
const index_1 = require("./categoryRepository/index");
class CategoryRepository {
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    addCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (0, index_1.addCategory)(category);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    existCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (0, index_1.existCategory)(category);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    getCategories(admin) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.getCategories)(admin);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    freezCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.freezCategory)(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    unFreezCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.unFreezCategory)(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.CategoryRepository = CategoryRepository;
//# sourceMappingURL=categoryRepository.js.map