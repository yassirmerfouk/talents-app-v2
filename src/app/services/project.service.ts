import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Project} from "../models/project.model";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn : 'root'
})
export class ProjectService{

  private httpClient : HttpClient = inject(HttpClient);

  private api : string = `${environment.api}/projects`;

  public addProject(project : Project) : Observable<Project>{
    return this.httpClient.post<Project>(`${this.api}`, project);
  }

  public updateProject(project : Project) : Observable<Project>{
    return this.httpClient.put<Project>(`${this.api}/${project.id}`, project);
  }

  public deleteProject(id : number) : Observable<any>{
    return this.httpClient.delete(`${this.api}/${id}`);
  }
}
