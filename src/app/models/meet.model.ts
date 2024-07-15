import {User} from "./user.model";

export interface Meet{

  id : number,
  title : number,
  date : string,
  meetType : string,
  contactType : string,
  status : string,
  firstBody : string,
  secondBody : string,
  sender : User,
  receivers : Array<any>,


  jobId ?: number
}
