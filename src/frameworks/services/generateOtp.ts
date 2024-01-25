
class GenerateOtp{
  async generateOtp(length:number):Promise<number>{
const numericChars = "0123456789"
let otp = ""

for(let i = 0 ;i<length ;i++){
  const randomIndex = Math.floor(Math.random() * numericChars.length);
  otp += numericChars[randomIndex]
}

if(otp.length == 4){
  return parseInt(otp)
}else{
  return this.generateOtp(4)
}
  }
}

export default GenerateOtp