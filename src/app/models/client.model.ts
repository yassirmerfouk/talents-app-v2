import {User} from "./user.model";

export interface ClientRequest{

  email : string,
  firstName : string,
  lastName : string,
  phone : string,
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

export interface Client extends User{

/*  id : number,
  email : string,
  firstName : string,
  lastName : string,*/
/*  phone : string,
  image : string,*/
/*  status : string,*/
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
