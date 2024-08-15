import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {ErrorSuccessState} from "./states.model";

@Injectable({
  providedIn: 'root'
})
export class Store {

  private stateSubject : Subject<any> = new Subject<any>();
  public state$ : Observable<any> = this.stateSubject.asObservable();

  private errorSuccessStateSubject : Subject<ErrorSuccessState> = new Subject<ErrorSuccessState>();
  public errorSuccessState$ : Observable<ErrorSuccessState> = this.errorSuccessStateSubject.asObservable();

  public state: any = {localTalentsState : {localTalents : []}};
  public errorSuccessState : ErrorSuccessState = {};

  public setState(state: any): void {
    this.state = {...this.state, ...state};
    this.stateSubject.next(this.state);
  }

  public setErrorSuccessState(state : ErrorSuccessState) : void {
    this.errorSuccessStateSubject.next(state);
  }

  public clearState(): void {
    this.state = {};
  }

  public clearErrorSuccessState(): void {
    this.errorSuccessState = {};
  }

}
