export interface IInstructorAgreement {
  userId:string,
  status:"approved"|"pending" |"rejected"
  qualification:string,
  consent:boolean
  contract: string;
}