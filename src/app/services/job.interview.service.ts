import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {JobInterview} from "../models/job.interview.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JobInterviewService {

  private httpClient: HttpClient = inject(HttpClient);

  private api: string = `${environment.api}/job-interviews`;

  public addJobInterview(applicationId: number, jobInterview: JobInterview): Observable<JobInterview> {
    return this.httpClient.post<JobInterview>(`${this.api}/${applicationId}`, jobInterview);
  }

  public acceptJobInterview(id: number): Observable<any> {
    return this.httpClient.post<any>(`${this.api}/accept/${id}`, {});
  }
}
