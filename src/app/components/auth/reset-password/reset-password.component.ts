import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventService} from "../../../services/event.service";
import {EventType} from "../../../state/event-type.enum";
import {Subscription} from "rxjs";
import {Helper} from "../../../helper/helper";
import {ErrorSuccessState} from "../../../state/states.model";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  private eventService: EventService = inject(EventService);
  private stateSubscription !: Subscription;
  private helper: Helper = inject(Helper);

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private formBuilder: FormBuilder = inject(FormBuilder);

  public token !: string;
  public email !: string;

  public resetForm !: FormGroup;

  public errorSuccessState : ErrorSuccessState = {};

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

    this.stateSubscription = this.helper.subscribeToErrorSuccessState(this.errorSuccessState);
  }

  public handleResetPassword(): void {
    let resetPasswordRequest = this.resetForm.value;
    this.eventService.dispatchEvent({eventType: EventType.RESET_PASSWORD, payload: resetPasswordRequest});
  }

  public ngOnDestroy() {
    if (this.stateSubscription)
      this.stateSubscription.unsubscribe();
    this.helper.clearErrorSuccessState();
  }
}
