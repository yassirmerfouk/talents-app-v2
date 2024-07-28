import {User} from "./user.model";
import {Application} from "./application.model";

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


  jobId ?: number,
  applicationId ?: number,

  application : Application
}
