import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ClientRegistration, TalentRegistration} from "../models/registration.model";
import {AuthenticationRequest, AuthenticationResponse} from "../models/authentication.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn : 'root'
})
export class AuthService{

  private httpClient : HttpClient = inject(HttpClient);

  private api : string = `${environment.api}/auth`

  public registerTalent(talentRegistration : TalentRegistration) : Observable<any>{
    return this.httpClient.post(`${this.api}/talent/register`, talentRegistration);
  }

  public registerClient(clientRegistration : ClientRegistration) : Observable<any>{
    return this.httpClient.post(`${this.api}/client/register`, clientRegistration);
  }

  public login(authenticationRequest : AuthenticationRequest) : Observable<AuthenticationResponse>{
    return this.httpClient.post<AuthenticationResponse>(`${this.api}/login`, authenticationRequest);
  }

  public recoverPassword(email : string) : Observable<any> {
    return this.httpClient.post(`${this.api}/password/forgot?email=${email}`, {});
  }

  public resetPassword(resetPasswordRequest : any) : Observable<any>{
    return this.httpClient.post<any>(`${this.api}/password/reset`, resetPasswordRequest);
  }

  public confirmAccount(token : string) : Observable<any>{
    return this.httpClient.post<any>(`${this.api}/account/confirm?token=${token}`,{} );
  }
}
