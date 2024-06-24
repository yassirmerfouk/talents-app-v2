export interface TalentRegistration{
  email : string,
  password : string,
  firstName : string,
  lastName : string,
  phone : string,
  title: string,
  summary : string,
  dateOfBirth : string,
  city : string,
  address : string
}

export interface ClientRegistration{
  email : string,
  password : string,
  firstName : string,
  lastName : string,
  phone : string,
  sector : string,
  country : string,
  city : string,
  type : String,
  companyName : string | null,
  website : string | null,
  size : string | null
}

