import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Statistic} from "../models/statistic.model";

@Injectable({
  providedIn : 'root'
})
export class StatisticService{

  private httpClient: HttpClient = inject(HttpClient);

  private api: string = `${environment.api}/statistics`;

  public getStatistics() : Observable<Statistic>{
    return this.httpClient.get<Statistic>(`${this.api}`);
  }
}
