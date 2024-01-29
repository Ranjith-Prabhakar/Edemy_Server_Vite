import { IInstructorAgreement } from "../../../../entities/instructorAgreement";
import ErrorHandler from "../../../../useCasese/handler/errorHandler";
import { IInstructorAgreementRepository } from "../../../../useCasese/interface/repository/instructorAgreementRepository";
import { IJsonResponse } from "../../../../useCasese/interface/services/jsonResponse";
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

        await instructorAgreementModel.create(agreement);
        return {
          status: 200,
          success: true,
          message: "request has been recorded",
        };
      } else {
        return {
          status: 400,
          success: false,
          message: "request has been made already and is in processs",
        };
      }
    } catch (error: any) {
      return {
        status: 500,
        success: false,
        message: "error while fetching data from db",
      };
    }
  }
  // ******************************************************************************************
  async updateStatus(userId: string, action: string): Promise<IJsonResponse> {
    try {
      const result = await instructorAgreementModel.findByIdAndUpdate(
        userId,
        {
          status: action ,
        },
        { new: true }
      );
      if (result) {
        return {
          status: 200,
          success: true,
          message: "status has been updated",
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
