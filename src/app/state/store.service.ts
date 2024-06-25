import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn : 'root'
})
export class Store{

  private stateSubject : Subject<any> = new Subject<any>();
  public state$ : Observable<any> = this.stateSubject.asObservable();

  public state : any = {};

  public setState(state : any) : void {
    this.state = {...this.state, ...state};
    this.stateSubject.next(this.state);
  }

  public clearState() : void {
    this.state = {};
  }
}
