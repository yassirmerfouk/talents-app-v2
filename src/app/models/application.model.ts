import {Talent} from "./talent.model";
import {JobInterview} from "./job.interview.model";

export interface Application{

  id : number,
  score : number,
  experiencesScore : number,
  projectsScore : number,
  skillsScore : number,
  selected : boolean,
  approved : boolean,
  refused : boolean,
  talent : Talent,
  jobId : number

  hasAdminMeet : boolean,
  hasClientMeet : boolean,

  jobInterviews : Array<JobInterview>
}
