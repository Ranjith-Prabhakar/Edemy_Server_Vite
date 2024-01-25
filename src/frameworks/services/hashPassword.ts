import bcrypt from 'bcryptjs'
import HashPassword from '../../useCasese/interface/services/hashPassword'

class Encrypt implements HashPassword {

  constructor(){}

  async createHash(password: string): Promise<string> {
    
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const hashPassword = await bcrypt.hash(password,salt)
    return hashPassword

  }

  async comparePassword(password: string, hashPassword: string): Promise<boolean> {
     const passwordMatch=await bcrypt.compare(password,hashPassword)
        return passwordMatch
  }

}

export default Encrypt