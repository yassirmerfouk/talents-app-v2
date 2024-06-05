import {Talent} from "./talent.model";

export interface Application{

  score : number,
  selected : boolean,
  approved : boolean,
  talent : Talent,
  jobId : number
}
