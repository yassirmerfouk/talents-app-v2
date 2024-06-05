import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client, ClientRequest} from "../models/client.model";
import {Page} from "../models/page.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn : 'root'
})
export class ClientService{

  private httpClient : HttpClient = inject(HttpClient);

  private api : string = `${environment.api}/clients`;

  public profile() : Observable<Client>{
    return this.httpClient.get<Client>(`${this.api}/profile`);
  }

  public updateProfile(clientRequest : ClientRequest) : Observable<Client>{
    return this.httpClient.patch<Client>(`${this.api}/profile`, clientRequest);
  }

  public getClients(status : string,page : number, size : number) : Observable<Page<Client>> {
    return this.httpClient.get<Page<Client>>(`${this.api}?status=${status}&page=${page}&size=${size}`)
  }

  public getClient(id : number) : Observable<Client>{
    return this.httpClient.get<Client>(`${this.api}/${id}`);
  }
}
