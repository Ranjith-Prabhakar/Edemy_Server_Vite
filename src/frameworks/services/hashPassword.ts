import bcrypt from 'bcryptjs'
import {IHashpassword} from '../../useCasese/interface/services/hashPassword'

export class Encrypt implements IHashpassword {

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
