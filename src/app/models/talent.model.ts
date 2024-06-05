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
  address : string
}

export interface Talent extends User{

 /* id: number,
  email: string,
  firstName: string,
  lastName: string,*/
/*  phone: string,
  image: string,*/
/*  status: string,*/
  title: string,
  summary: string,
  dateOfBirth: string,
  city: string,
  address: string,

  experiences : Array<Experience>,

  educations : Array<Education>,

  projects : Array<Project>,

  certifications : Array<Certification>,

  languages : Array<Language>

}

