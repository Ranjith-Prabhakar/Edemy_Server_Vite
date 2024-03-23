import { IInstructorAgreement } from "../../../entities/instructorAgreement";
import { IInstructorAgreementRepository } from "../../../useCasese/interface/repository/instructorAgreementRepository";
import { IInstructorAgreementResponse } from "../../../useCasese/interface/request_And_Response/instructorAgreement";
import { IJsonResponse } from "../../../useCasese/interface/services/jsonResponse";
import instructorAgreementModel from "../models/instructorAgreementModel";

export class InstrctorAgreementRepository
  implements IInstructorAgreementRepository
{
  // ******************************************************************************************
  async createAgreement(
    agreement: IInstructorAgreement
  ): Promise<IJsonResponse> {
    try {
      const isExist = await instructorAgreementModel.findOne({
        userId: agreement.userId as string,
      });

      if (!isExist) {
        const result = await instructorAgreementModel.create(agreement);
        return {
          status: 200,
          success: true,
          message: "request has been recorded",
          agreement: result ,
        };
      } else {
        return {
          status: 400,
          success: false,
          message: "request has been made already and is in processs",
        };
      }
    } catch (error) {
      throw error;
    }
  }
  // ******************************************************************************************
  async getAgreements(): Promise<void | object> {
    try {
      const result = await instructorAgreementModel.find({ status: "pending" });
      return {
        success: true,
        message: "instructors agreements have been fetched successfully",
        data: result,
      };
    } catch (error) {
      throw error;
    }
  }

  // ******************************************************************************************
  async updateStatus(
    userId: string,
    action: string
  ): Promise<IInstructorAgreementResponse> {
    try {
      const result = await instructorAgreementModel.findByIdAndUpdate(
        userId,
        {
          status: action,
        },
        { new: true }
      );
      if (result) {
        return {
          status: 200,
          success: true,
          message: "status has been updated",
          data: result,
        };
      } else {
        return {
          status: 404,
          success: true,
          message: "record not found",
        };
      }
    } catch (error) {
      return {
        status: 500,
        success: false,
        message: "error while fetching data from db",
      };
    }
  }
}
