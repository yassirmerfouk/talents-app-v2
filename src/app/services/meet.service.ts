import {HttpClient} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Meet} from "../models/meet.model";
import {Observable} from "rxjs";
import {Page} from "../models/page.model";

@Injectable({
  providedIn : 'root'
})
export class MeetService{

  private httpClient : HttpClient = inject(HttpClient);

  private api : string = `${environment.api}/meets`;

  public addMeet(meet : Meet) : Observable<Meet>{
    return this.httpClient.post<Meet>(`${this.api}`, meet);
  }

  public addSelectionMeet(meet : Meet) : Observable<Meet>{
    return this.httpClient.post<Meet>(`${this.api}/selection`, meet);
  }

  public closeMeet(id : number) : Observable<any>{
    return this.httpClient.post(`${this.api}/${id}/close`, {});
  }

  public getMeets(date : string, page : number, size : number) : Observable<Page<Meet>>{
    return this.httpClient.get<Page<Meet>>(`${this.api}?date=${date}&page=${page}&size=${size}`);
  }

}
