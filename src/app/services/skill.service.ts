import {HttpClient} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Page} from "../models/page.model";
import {Skill} from "../models/skill.model";

@Injectable({
  providedIn: 'root'
})
export class SkillService {


  private httpClient: HttpClient = inject(HttpClient);

  private api: string = `${environment.api}/skills`;

  public getSkills(): Observable<Array<any>> {
    return this.httpClient.get<Array<any>>(this.api);
  }

  public getSkillsByPage(page: number, size: number): Observable<Page<Skill>> {
    return this.httpClient.get<Page<Skill>>(`${this.api}/page?page=${page}&size=${size}`);
  }

  public addSkill(skill: Skill): Observable<Skill> {
    return this.httpClient.post<Skill>(`${this.api}`, skill);
  }

  public updateSkill(skill: Skill): Observable<Skill> {
    return this.httpClient.put<Skill>(`${this.api}/${skill.id}`, skill);
  }

  public deleteSkill(id: number): Observable<any> {
    return this.httpClient.delete(`${this.api}/${id}`);
  }
}
