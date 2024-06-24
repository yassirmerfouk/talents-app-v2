import {Client} from "./client.model";

export interface JobRequest{
  id : number
  title : string,
  sector : string,
  description : string,
  minSalary : number,
  maxSalary : string,
  currency : string,
  yearsOfExperiences : number,
  numberOfTalents : number,
  contractType : string,
  period : number | null,
  periodUnit : string | null,
  type : string,
  skills : Array<string>

}

export interface Job {
  id : number,
  title : string,
  sector : string,
  description : string,
  minSalary : number,
  maxSalary : string,
  currency : string,
  yearsOfExperiences : number,
  numberOfTalents : number,
  contractType : string
  period : number,
  periodUnit : string,
  type : string,
  status : string,
  createdAt : string,
  skills : Array<string>,

  applied : boolean,
  applicationsNumber : number,

  client : Client

}
