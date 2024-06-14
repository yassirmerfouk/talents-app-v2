import {User} from "./user.model";

export interface Meet{

  id : number,
  title : number,
  date : string,
  meetType : string,
  contactType : string,
  status : string,
  sender : User,
  receiver : User
}
