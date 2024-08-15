import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Selection, SelectionRequest} from "../models/selection.model";
import {Observable} from "rxjs";
import {Page} from "../models/page.model";

@Injectable({
  providedIn: "root"
})
export class SelectionService {

  private httpClient: HttpClient = inject(HttpClient);

  private api: string = `${environment.api}/selections`;

  public addSelection(selection: SelectionRequest): Observable<Selection> {
    return this.httpClient.post<Selection>(this.api, selection);
  }

  public getSelections(status: string, page: number, size: number): Observable<Page<Selection>> {
    return this.httpClient.get<Page<Selection>>(`${this.api}?status=${status}&page=${page}&size=${size}`);
  }

  public getMySelections(page: number, size: number): Observable<Page<Selection>> {
    return this.httpClient.get<Page<Selection>>(`${this.api}/authenticated?page=${page}&size=${size}`);
  }

  public getSelectionById(id: number): Observable<Selection> {
    return this.httpClient.get<Selection>(`${this.api}/${id}`);
  }

  public deleteSelection(id : number) : Observable<any> {
    return this.httpClient.delete(`${this.api}/${id}`);
  }
}
