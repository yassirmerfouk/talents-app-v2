import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn : 'root'
})
export class UserService{

  private httpClient : HttpClient = inject(HttpClient);

  private api : string = `${environment.api}/users`

  public verifyUser(id : number) : Observable<any> {
    return this.httpClient.patch(`${this.api}/${id}/verify`, {});
  }

  public banUser(id : number) : Observable<any> {
    return this.httpClient.patch(`${this.api}/${id}/ban`, {});
  }

  public updateImage(image : File) : Observable<any>{
    const form : FormData = new FormData();
    form.append('image', image);
    return this.httpClient.patch(`${this.api}/image`, form,{responseType: 'text'});
  }

  public askForVerification() : Observable<any>{
    return this.httpClient.patch<any>(`${this.api}/verification/ask`, {});
  }
}
