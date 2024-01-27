/// not used yet
export const mailValidation = (email:string):boolean | {}=>{
    let emailRegex:RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}