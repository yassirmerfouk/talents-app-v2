import {User} from "./user.model";

export interface ClientRequest{

  email : string,
  firstName : string,
  lastName : string,
  phone : string,
  companyName : string | null,
  sector : string,
  shortDescription : string,
  longDescription : string,
  city : string,
  country : string,
  website : string | null,
  size : string | null,
  type : string
}

export interface Client extends User{
  companyName : string,
  sector : string,
  shortDescription : string,
  longDescription : string,
  city : string,
  country : string,
  website : string,
  size : string,
  type : string

}
