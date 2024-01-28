import { IInstructorAgreement } from "../../../../entities/instructorAgreement";
import { IInstructorAgreementRepository } from "../../../../useCasese/interface/repository/instructorAgreementRepository";
import instructorAgreementModel from "../models/instructorAgreementModel";

export class InstrctorAgreementRepository implements IInstructorAgreementRepository {
  async createAgreement(agreement: IInstructorAgreement): Promise<boolean> {
    try {
      await instructorAgreementModel.create(agreement);
      return true;
    } catch (error: any) {
      return false;
    }
  }
}
