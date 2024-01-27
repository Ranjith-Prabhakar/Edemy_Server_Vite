
/// not used yet
type TUser = {
  name:string | null,
  email:string | null,
  password:string | null,
  confirmPassword:string | null
}
export const trimUser = (user:TUser):TUser=>{
      user.name = user.name ? user.name.trim() : null
      user.email = user.email ? user.email.trim() : null
      user.password = user.password ? user.password.trim() : null
      user.confirmPassword = user.confirmPassword ? user.confirmPassword.trim() : null
      return user
}