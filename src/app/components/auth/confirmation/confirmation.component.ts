import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {EventService} from "../../../services/event.service";
import {EventType} from "../../../state/event-type.enum";
import {Store} from "../../../state/store.service";
import {Subscription} from "rxjs";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent implements OnInit, OnDestroy {

  private store: Store = inject(Store);
  private eventService: EventService = inject(EventService);
  private stateSubscription !: Subscription;


  private code !: string;
  public completed: boolean = false;

  private toast: NgToastService = inject(NgToastService);

  public error !: string;
  public errors !: any;
  public successMessage !: string;

  public ngOnInit(): void {
    this.stateSubscription = this.store.state$.subscribe(
      (state: any) => {
        this.error = state.errorSuccessState?.error;
        this.errors = state.errorSuccessState?.errors ? new Map(Object.entries(state.errorSuccessState.errors)) : new Map;
        this.successMessage = state.errorSuccessState?.successMessage;
        if (this.error)
          this.toast.danger(this.error, "", 5000);
        if (this.successMessage)
          this.toast.success(this.successMessage, "", 5000);
      }
    );
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
    this.store.clearErrorSuccessState();
  }
}
