import mongoose,{Schema,Model,ObjectId} from "mongoose";
import { IInstructorAgreement } from "../../../../entities/instructorAgreement";

const instrctorAgreementSchema: Schema<IInstructorAgreement> = new Schema({
  userId: {
    type:String,
    unique:true
  },
  status:{
    type:String,
    default:"pending"
  },
  qualification: String,
  consent: Boolean,
  contract: {
    type: String,
    default: `you are responsible to provide quality education, adhere to the platform's guidelines,
       maintain professionalism, engage students effectively, and continuously improve your 
       teaching methods for an enriching e-learning experience.
        tutor agrees to a revenue-sharing model of 30/70, where the tutor receives 70%
         of the income generated, and the platform retains 30%, as specified in our terms and conditions
       `,
  },
}); 

const instructorAgreementModel: Model<IInstructorAgreement> = mongoose.model(
  "instructor_agreement",
  instrctorAgreementSchema
);

export default instructorAgreementModel;