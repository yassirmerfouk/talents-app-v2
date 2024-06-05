import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Language} from "../models/language.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn : 'root'
})
export class LanguageService{

  private httpClient : HttpClient = inject(HttpClient);

  private api : string = `${environment.api}/languages`;

  public addLanguage(language : Language) : Observable<Language>{
    return this.httpClient.post<Language>(`${this.api}`, language);
  }

  public updateLanguage(language : Language) : Observable<Language>{
    return this.httpClient.put<Language>(`${this.api}/${language.id}`, language);
  }

  public deleteLanguage(id : number) : Observable<any>{
    return this.httpClient.delete(`${this.api}/${id}`);
  }
}
