import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn : 'root'
})
export class LocationService{

  private httpClient : HttpClient = inject(HttpClient);

  private api : string = `${environment.api}`;

  public getCities() : Observable<Array<string>>{
    return this.httpClient.get<Array<string>>(`${this.api}/cities`);
  }
}
