export interface IUser{
  _id?:string,
  name:string,
  email:string,
  password:string ,
  avatar?:{
    public_id:string,
    url:string
  },
  role?:"user" | "instructor" | "admin",
  isVerified?:boolean,
  courses?:Array<{courseId:string}>,
  enrolledCourses?:Array<{courseId:string}>
}

