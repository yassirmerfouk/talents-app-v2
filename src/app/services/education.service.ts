import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Education} from "../models/education.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn : 'root'
})
export class EducationService{

  private httpClient : HttpClient = inject(HttpClient);

  private api : string = `${environment.api}/educations`

  public addEducation(education : Education) : Observable<Education>{
    return this.httpClient.post<Education>(`${this.api}`, education);
  }

  public updateEducation(education : Education) : Observable<Education>{
    return this.httpClient.put<Education>(`${this.api}/${education.id}`,education);
  }

  public deleteEducation(id : number) : Observable<any>{
    return this.httpClient.delete(`${this.api}/${id}`);
  }
}
