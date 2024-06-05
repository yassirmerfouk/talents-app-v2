import {inject, Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {ActionEvent} from "../state/action-event.event";
import {Reducer} from "../state/reducer.service";

@Injectable({
  providedIn : 'root'
})
export class EventService{

  private eventSubject : Subject<ActionEvent> = new Subject<ActionEvent>();
  public event$ : Observable<ActionEvent> = this.eventSubject.asObservable();

  private reducer : Reducer = inject(Reducer);

  public publishEvent(actionEvent : ActionEvent) : void {
    this.eventSubject.next(actionEvent);
  }

  public dispatchEvent($event : ActionEvent) : void {
    this.reducer.dispatch($event);
  }
}
