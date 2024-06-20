import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Job, JobRequest} from "../models/job.model";
import {Observable} from "rxjs";
import {Page} from "../models/page.model";
import {environment} from "../../environments/environment";
import {Application} from "../models/application.model";

@Injectable({
  providedIn : 'root'
})
export class JobService{

  private httpClient : HttpClient = inject(HttpClient);

  private api : string = `${environment.api}/jobs`

  public addJob(jobRequest : JobRequest) : Observable<Job>{
    return this.httpClient.post<Job>(`${this.api}`, jobRequest);
  }

  public updateJob(jobRequest : JobRequest) : Observable<Job>{
    return this.httpClient.put<Job>(`${this.api}/${jobRequest.id}`, jobRequest);
  }

  public deleteJob(id : number) : Observable<any>{
    return this.httpClient.delete(`${this.api}/${id}`);
  }

  public getMyJobs(page : number, size : number) : Observable<Page<Job>>{
    return this.httpClient.get<Page<Job>>(`${this.api}/client/authenticated?page=${page}&size=${size}`);
  }

  public getJobs(status : string, page : number, size : number) : Observable<Page<Job>>{
    return this.httpClient.get<Page<Job>>(`${this.api}?status=${status}&page=${page}&size=${size}`);
  }

  public searchJobs(keyword : string, page : number, size : number) : Observable<Page<Job>>{
    return this.httpClient.get<Page<Job>>(`${this.api}/search?keyword=${keyword}&page=${page}&size=${size}`);
  }

  public getJob(id : number) : Observable<Job>{
    return this.httpClient.get<Job>(`${this.api}/${id}`);
  }

  public applyToJob(id : number) : Observable<any>{
    return this.httpClient.post<any>(`${this.api}/${id}/apply`, {});
  }

  public getJobApplications(id : number, page : number, size : number) : Observable<Page<Application>> {
    return this.httpClient.get<Page<Application>>(`${this.api}/${id}/applications?page=${page}&size=${size}`);
  }

  public selectTalentForJob(jobId : number, talentId : number) : Observable<any>{
    return this.httpClient.post<any>(`${this.api}/${jobId}/select/${talentId}`,{});
  }

  public getSelectedJobApplication(jobId : number) : Observable<Array<Application>>{
    return this.httpClient.get<Array<Application>>(`${this.api}/${jobId}/applications/selected`);
  }

  public getApprovedJobApplications(jobId : number) : Observable<Array<Application>>{
    return this.httpClient.get<Array<Application>>(`${this.api}/${jobId}/applications/approved`);
  }

  public approveTalent(jobId : number, talentId : number) : Observable<any>{
    return this.httpClient.post<any>(`${this.api}/${jobId}/approve/${talentId}`, {});
  }

  public askToStartProcess(jobId : number) : Observable<any>{
    return this.httpClient.post(`${this.api}/${jobId}/process/ask`, {});
  }

  public startProcess(jobId : number) : Observable<any>{
    return this.httpClient.post(`${this.api}/${jobId}/process/start`, {});
  }

  public startSelection(jobId : number) : Observable<any>{
    return this.httpClient.post(`${this.api}/${jobId}/process/selection`, {});
  }

}
