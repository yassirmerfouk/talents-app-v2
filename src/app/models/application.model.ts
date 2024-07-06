import {Talent} from "./talent.model";

export interface Application{

  score : number,
  experiencesScore : number,
  projectsScore : number,
  skillsScore : number,
  selected : boolean,
  approved : boolean,
  refused : boolean,
  hasMeet : boolean,
  talent : Talent,
  jobId : number
}
