import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Experience} from "../models/experience.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn : 'root'
})
export class ExperienceService{

  private httpClient : HttpClient = inject(HttpClient);

  private api : string = `${environment.api}/experiences`

  public addExperience(experience : Experience) : Observable<Experience>{
    return this.httpClient.post<Experience>(`${this.api}`, experience);
  }

  public updateExperience(experience : Experience) : Observable<Experience>{
    return this.httpClient.put<Experience>(`${this.api}/${experience.id}`, experience);
  }
  public deleteExperience(id : number) : Observable<any>{
    return this.httpClient.delete(`${this.api}/${id}`);
  }
}
