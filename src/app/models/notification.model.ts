import {User} from "./user.model";

export interface Notification{
  id : number,
  body : string,
  type : string,
  relatedModel : number,
  seen : boolean,
  clicked : boolean
  createdAt : string

  sender : User,
  receiver : User
}
