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
  type : String
}

export interface PClientRegistration extends ClientRegistration{

}

export interface CClientRegistration extends ClientRegistration{
  companyName : string,
  website : string,
  size : string
}
