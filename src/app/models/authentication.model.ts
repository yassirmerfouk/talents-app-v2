export interface AuthenticationRequest{
  email : string,
  password : string
}

export interface AuthenticationResponse{
  accessToken : string,
  refreshToken : string
}

export interface AuthState{
  isAuthenticated : boolean,
  id : number | undefined,
  firstName : string | undefined,
  lastName : string | undefined,
  email : string | undefined,
  status : string | undefined,
  image : string | undefined,
  authorities: string[] | undefined,
  accessToken: string | undefined,
  expireAt: Date | undefined
}
