import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventService} from "../../../services/event.service";
import {EventType} from "../../../state/event-type.enum";
import {Store} from "../../../state/store.service";
import {Subscription} from "rxjs";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  private store: Store = inject(Store);
  private eventService: EventService = inject(EventService);
  private stateSubscription !: Subscription;

  private formBuilder: FormBuilder = inject(FormBuilder);

  private toast: NgToastService = inject(NgToastService);

  public recoverForm !: FormGroup;

  public error !: string;
  public errors !: any;
  public successMessage !: string;

  public ngOnInit(): void {

    this.recoverForm = this.formBuilder.group({
      email: this.formBuilder.control(null, [Validators.required, Validators.email])
    });

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

  public handleRecoverPassword(): void {
    let email = this.recoverForm.value.email;
    this.eventService.dispatchEvent({eventType: EventType.RECOVER_PASSWORD, payload: email});
  }

  public ngOnDestroy() {
    if (this.stateSubscription)
      this.stateSubscription.unsubscribe();
    this.store.clearErrorSuccessState();
  }
}
