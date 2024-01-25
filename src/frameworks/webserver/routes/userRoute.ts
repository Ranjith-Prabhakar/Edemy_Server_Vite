import {Route,Req,Res, Next} from '../../types/serverPackageTypes'
import { userController } from './injections/userInjuction'



export function userRoute(router:Route){

  router.post('/register',(req:Req,res:Res,next:Next)=> userController.createUser(req,res,next))

  return router
}