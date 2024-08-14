import {Talent} from "./talent.model";
import {Client} from "./client.model";

export interface SelectionRequest{

  title : string,
  description : string,
  sector : string,
  talentsIds : Array<number>
}

export interface Selection{

  id : number,
  title : string,
  sector : string,
  description : string,
  createdAt : string,
  status : string,
  numberOfTalents : number,
  client : Client
  items : Array<ItemResponse>
}

export interface ItemResponse {
  id : number,
  selected : boolean,
  level : string,
  report : string
  talent : Talent
}

