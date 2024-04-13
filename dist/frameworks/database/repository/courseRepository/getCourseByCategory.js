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
exports.getCourseByCategory = void 0;
const courseModel_1 = __importDefault(require("../../models/courseModel"));
const getCourseByCategory = (category, pageNumber, frequency, sort, filter) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("category pageNumber frequency sort filter @@@@@@@@@@ [filter]", category, pageNumber, frequency, sort, filter, [filter]);
        const sortValue = sort === "A-Z" ? -1 : 1;
        console.log("sortValue ######", sortValue);
        if (category === "all category") {
            const length = (yield courseModel_1.default.find()).length;
            if (length) {
                const end = pageNumber * frequency;
                const start = end - frequency;
                const result = yield courseModel_1.default
                    .find()
                    .sort({ [filter]: sortValue })
                    .skip(start)
                    .limit(end);
                // console.log("result ######", result);
                return {
                    status: 200,
                    message: "couses have been fetched successfully",
                    hasMore: length - end > 0,
                    data: result,
                };
            }
            else {
                return {
                    hasMore: false,
                    message: "no courses for this category",
                    status: 400,
                };
            }
        }
        else {
            const length = (yield courseModel_1.default.find({
                category: { $regex: new RegExp(category, "i") },
            })).length;
            if (length) {
                const end = pageNumber * frequency;
                const start = end - frequency;
                const result = yield courseModel_1.default
                    .find({
                    category: { $regex: new RegExp(category, "i") },
                })
                    .sort({ [filter]: sortValue })
                    .skip(start)
                    .limit(end);
                // console.log("result ######", result);
                return {
                    status: 200,
                    message: "couses have been fetched successfully",
                    hasMore: length - end > 0,
                    data: result,
                };
            }
            else {
                return {
                    hasMore: false,
                    message: "no courses for this category",
                    status: 400,
                };
            }
        }
    }
    catch (error) {
        throw error;
    }
});
exports.getCourseByCategory = getCourseByCategory;
// import { ICourseCategoryBaseResponse } from "../../../../useCasese/interface/request_And_Response/course";
// import courseModel from "../../models/courseModel";
// export const getCourseByCategory = async (
//   category: string,
//   pageNumber: number,
//   frequency: number,
//   sort: string,
//   filter: string
// ): Promise<void | ICourseCategoryBaseResponse> => {
//   try {
//     console.log(
//       "category pageNumber frequency sort filter @@@@@@@@@@",
//       category,
//       pageNumber,
//       frequency,
//       sort,
//       filter
//     );
//     const sortValue = sort === "A-Z" ? -1 : 1
//     if (category === "all category") {
//       const length = (await courseModel.find()).length;
//       if (length) {
//         const end = pageNumber * frequency;
//         const start = end - frequency;
//         const result = await courseModel.find().skip(start).limit(end);
//         return {
//           status: 200,
//           message: "couses have been fetched successfully",
//           hasMore: length - end > 0,
//           data: result,
//         };
//       } else {
//         return {
//           hasMore: false,
//           message: "no courses for this category",
//           status: 400,
//         };
//       }
//     } else {
//       const length = (await courseModel.find({ category })).length;
//       if (length) {
//         const end = pageNumber * frequency;
//         const start = end - frequency;
//         const result = await courseModel
//           .find({ category })
//           .skip(start)
//           .limit(end);
//         return {
//           status: 200,
//           message: "couses have been fetched successfully",
//           hasMore: length - end > 0,
//           data: result,
//         };
//       } else {
//         return {
//           hasMore: false,
//           message: "no courses for this category",
//           status: 400,
//         };
//       }
//     }
//   } catch (error) {
//     throw error;
//   }
// };
//# sourceMappingURL=getCourseByCategory.js.map