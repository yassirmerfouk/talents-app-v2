import {Injectable} from "@angular/core";
import {AuthState} from "../models/authentication.model";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

  public authState: AuthState = {
    isAuthenticated: false,
    id: undefined,
    firstName : undefined,
    lastName : undefined,
    email: undefined,
    image : undefined,
    authorities: undefined,
    accessToken: undefined,
    expireAt: undefined
  }

  public loadUser(accessToken: string): void {
    let decodedJwt: any = jwtDecode(accessToken);
    let expireAt: Date = new Date(0);
    expireAt.setUTCSeconds(decodedJwt.exp);
    this.authState = {
      isAuthenticated: true,
      id: decodedJwt.id,
      firstName : decodedJwt.firstName,
      lastName : decodedJwt.lastName,
      email: decodedJwt.sub,
      image : decodedJwt.image,
      authorities: decodedJwt.authorities,
      accessToken: accessToken,
      expireAt: expireAt
    }
  }

  public unloadUser() : void {
    this.authState = {
      isAuthenticated: false,
      id: undefined,
      firstName : undefined,
      lastName : undefined,
      email: undefined,
      image : undefined,
      authorities: undefined,
      accessToken: undefined,
      expireAt: undefined
    }
  }

  public storeTokenInLocalStorage(accessToken : string) : void{
    localStorage.setItem("accessToken", accessToken);
  }

  public getTokenFromLocalStorage() : string | null{
    return localStorage.getItem('accessToken');
  }

  public removeTokenFromLocalStorage() : void{
    localStorage.removeItem("accessToken");
  }

  public hasAuthority(authority : string) : boolean{
    let result = this.authState.authorities?.includes(authority);
    if(result) return true;
    else return false;
  }
}
