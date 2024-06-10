import {Client} from "./client.model";

export interface JobRequest{
  id : number
  title : string,
  sector : string,
  description : string,
  minSalary : number,
  maxSalary : string,
  period : string,
  yearsOfExperiences : number,
  numberOfTalents : number,
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
  period : string,
  yearsOfExperiences : number,
  numberOfTalents : number,
  type : string,
  status : string,
  createdAt : string,
  skills : Array<string>,

  applied : boolean,
  applicationsNumber : number,

  client : Client

}
