import mongoose,{Types} from 'mongoose';
import Otp from '../../../../entities/otp'

const otpSchema = new mongoose.Schema<Otp>({

userMail:String,
  otp: {
    type: Number,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  createdAt:{
    type:Date,
    required:true
  }
});

const OTP = mongoose.model<Otp>('OTP', otpSchema);

export default OTP
