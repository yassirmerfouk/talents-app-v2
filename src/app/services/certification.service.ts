import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Certification} from "../models/certification.model";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn : 'root'
})
export class CertificationService{

  private httpClient : HttpClient = inject(HttpClient);

  private api : string = `${environment.api}/certifications`;

  public addCertification(certification : Certification) : Observable<Certification>{
    return this.httpClient.post<Certification>(`${this.api}`, certification);
  }

  public updateCertification(certification : Certification) : Observable<Certification>{
    return this.httpClient.put<Certification>(`${this.api}/${certification.id}`, certification);
  }

  public deleteCertification(id : number) : Observable<any>{
    return this.httpClient.delete(`${this.api}/${id}`);
  }
}
