import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Talent, TalentRequest} from "../models/talent.model";
import {Page} from "../models/page.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn : 'root'
})
export class TalentService{

  private httpClient : HttpClient = inject(HttpClient);

  private api : string = `${environment.api}/talents`

  public profile() : Observable<Talent>{
    return this.httpClient.get<Talent>(`${this.api}/profile`)
  }

  public updateProfile(talentRequest : TalentRequest) : Observable<Talent>{
    return this.httpClient.patch<Talent>(`${this.api}/profile`, talentRequest);
  }

  public getTalents(status : string, page : number, size : number) : Observable<Page<Talent>>{
    return this.httpClient.get<Page<Talent>>(`${this.api}?status=${status}&page=${page}&size=${size}`);
  }

  public getTalent(id : number) : Observable<Talent>{
    return this.httpClient.get<Talent>(`${this.api}/${id}`);
  }
}
