import {User} from "./user.model";

export interface Meet{

  id : number,
  title : number,
  date : string,
  meetType : string,
  contactType : string,
  status : string,
  body : string,
  sender : User,
  receiver : User,

  receiverId ?: number, // only to add the receiver to the path

  jobId ?: number
}
