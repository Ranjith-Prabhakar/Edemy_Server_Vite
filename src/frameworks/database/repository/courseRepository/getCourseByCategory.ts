import { ICourseCategoryBaseResponse } from "../../../../useCasese/interface/request_And_Response/course";
import courseModel from "../../models/courseModel";

export const getCourseByCategory = async (
  category: string,
  pageNumber: number,
  frequency: number,
  sort: string,
  filter: string
): Promise<void | ICourseCategoryBaseResponse> => {
  try {
    console.log(
      "category pageNumber frequency sort filter @@@@@@@@@@ [filter]",
      category,
      pageNumber,
      frequency,
      sort,
      filter,
      [filter]
    );
    const sortValue = sort === "A-Z" ? -1 : 1;
    console.log("sortValue ######", sortValue);
    if (category === "all category") {
      const length = (await courseModel.find()).length;

      if (length) {
        const end = pageNumber * frequency;
        const start = end - frequency;
        const result = await courseModel
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
      } else {
        return {
          hasMore: false,
          message: "no courses for this category",
          status: 400,
        };
      }
    } else {
      const length = (
        await courseModel.find({
          category: { $regex: new RegExp(category, "i") },
        })
      ).length;
      if (length) {
        const end = pageNumber * frequency;
        const start = end - frequency;
        const result = await courseModel
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
      } else {
        return {
          hasMore: false,
          message: "no courses for this category",
          status: 400,
        };
      }
    }
  } catch (error) {
    throw error;
  }
};

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
