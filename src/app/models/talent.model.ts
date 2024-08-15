import {Experience} from "./experience.model";
import {Education} from "./education.model";
import {Project} from "./project.model";
import {Certification} from "./certification.model";
import {Language} from "./language.model";
import {User} from "./user.model";

export interface TalentRequest{
  email : string,
  firstName : string,
  lastName : string,
  phone : string,
  title : string,
  summary : string,
  dateOfBirth : string,
  city : string,
  address : string,
  available : boolean
}

export interface Talent extends User{

  title: string,
  summary: string,
  dateOfBirth: string,
  city: string,
  address: string,
  available : boolean

  experiences : Array<Experience>,

  educations : Array<Education>,

  projects : Array<Project>,

  certifications : Array<Certification>,

  languages : Array<Language>,

  skills : Array<string>

}

