import { ICreateOtp } from "../../useCasese/interface/services/createOtp";

export class GenerateOtp implements ICreateOtp{
async generateOTP():Promise<string>{
const numericChars = "0123456789"
let otp = ""
for(let i = 0 ;i<4 ;i++){
  const randomIndex = Math.floor(Math.random() * numericChars.length);
  otp += numericChars[randomIndex]
}
return otp
}
}
