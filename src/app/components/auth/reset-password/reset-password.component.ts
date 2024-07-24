import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventService} from "../../../services/event.service";
import {EventType} from "../../../state/event-type.enum";
import {Store} from "../../../state/store.service";
import {Subscription} from "rxjs";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  private store: Store = inject(Store);
  private eventService: EventService = inject(EventService);
  private stateSubscription !: Subscription;

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private formBuilder: FormBuilder = inject(FormBuilder);

  private toast: NgToastService = inject(NgToastService);

  public token !: string;
  public email !: string;

  public resetForm !: FormGroup;

  public error !: string;
  public errors !: any;
  public successMessage !: string;

  public ngOnInit(): void {

    this.activatedRoute.params.subscribe(
      (data: any) => {
        this.token = data['token'];
        this.activatedRoute.queryParams.subscribe(
          (data: any) => {
            this.email = data['email'];
            this.resetForm = this.formBuilder.group({
              email: this.formBuilder.control(this.email),
              password: this.formBuilder.control(null, [Validators.required, Validators.minLength(8)]),
              rePassword: this.formBuilder.control(null, [Validators.required, Validators.minLength(8)]),
              token: this.formBuilder.control(this.token)
            });
          }
        );
      }
    );

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

  public handleResetPassword(): void {
    let resetPasswordRequest = this.resetForm.value;
    this.eventService.dispatchEvent({eventType: EventType.RESET_PASSWORD, payload: resetPasswordRequest});
  }

  public ngOnDestroy() {
    if (this.stateSubscription)
      this.stateSubscription.unsubscribe();
    this.store.clearErrorSuccessState();
  }
}
