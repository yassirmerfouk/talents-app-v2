import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {EventService} from "../../../services/event.service";
import {EventType} from "../../../state/event-type.enum";
import {Subscription} from "rxjs";
import {Helper} from "../../../helper/helper";
import {ErrorSuccessState} from "../../../state/states.model";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent implements OnInit, OnDestroy {

  private eventService: EventService = inject(EventService);
  private stateSubscription !: Subscription;
  private helper: Helper = inject(Helper);

  private code !: string;
  public completed: boolean = false;

  public errorSuccessState : ErrorSuccessState = {};

  public ngOnInit(): void {
    this.stateSubscription = this.helper.subscribeToErrorSuccessState(this.errorSuccessState);
  }

  public onCodeCompleted(code: string): void {
    this.code = code;
    this.completed = true;
  }

  public handleConfirmAccount(): void {
    this.eventService.dispatchEvent({eventType: EventType.CONFIRM_ACCOUNT, payload: this.code});
  }

  public ngOnDestroy() {
    if (this.stateSubscription)
      this.stateSubscription.unsubscribe();
    this.helper.clearErrorSuccessState();
  }
}
