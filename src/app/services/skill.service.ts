import {HttpClient} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn : 'root'
})
export class SkillService{


  private httpClient : HttpClient = inject(HttpClient);

  private api : string = `${environment.api}/skills`;

  public getSkills() : Observable<Array<any>>{
    return this.httpClient.get<Array<any>>(this.api);
  }
}
