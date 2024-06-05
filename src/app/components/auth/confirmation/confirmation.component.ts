import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {EventService} from "../../../services/event.service";
import {EventType} from "../../../state/event-type.enum";
import {Store} from "../../../state/store.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent implements OnInit, OnDestroy{

  private store : Store = inject(Store);
  private eventService : EventService = inject(EventService);
  private stateSubscription !: Subscription;


  private code !: string;
  public completed : boolean = false;

  public error !: string;
  public errors !: any;
  public successMessage !: string;

  public ngOnInit() : void {
    this.stateSubscription = this.store.state$.subscribe(
      (state : any) => {
        this.error = state.accountConfirmationState.error;
        this.errors = state.accountConfirmationState.errors ? new Map(Object.entries(state.accountConfirmationState.errors)) : new Map;
        this.successMessage = state.accountConfirmationState.successMessage;
      }
    );
  }

  public onCodeCompleted(code : string) : void {
    this.code = code;
    this.completed = true;
  }

  public handleConfirmAccount() : void {
    this.eventService.publishEvent({eventType : EventType.CONFIRM_ACCOUNT, payload : this.code});
  }

  public ngOnDestroy() {
    if(this.stateSubscription)
      this.stateSubscription.unsubscribe();
  }
}
