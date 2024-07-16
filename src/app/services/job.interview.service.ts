import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {JobInterview} from "../models/job-interview.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn : 'root'
})
class JobInterviewService{

  private httpClient : HttpClient = inject(HttpClient);

  private api : string = `${environment.api}/job-interviews`;

  public addJobInterview(jobInterview : JobInterview) : Observable<JobInterview>{
    return this.httpClient.post<JobInterview>(`${this.api}`, jobInterview);
  }
}
