import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EventService} from "../../../services/event.service";
import {EventType} from "../../../state/event-type.enum";
import {Subscription} from "rxjs";
import {Helper} from "../../../helper/helper";
import {ErrorSuccessState} from "../../../state/states.model";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  private eventService: EventService = inject(EventService);
  private stateSubscription !: Subscription;
  private helper: Helper = inject(Helper);

  private formBuilder: FormBuilder = inject(FormBuilder);

  public recoverForm !: FormGroup;

  public errorSuccessState : ErrorSuccessState = {};

  public ngOnInit(): void {

    this.recoverForm = this.formBuilder.group({
      email: this.formBuilder.control(null, [Validators.required, Validators.email])
    });

    this.stateSubscription = this.helper.subscribeToErrorSuccessState(this.errorSuccessState);

  }

  public handleRecoverPassword(): void {
    let email = this.recoverForm.value.email;
    this.eventService.dispatchEvent({eventType: EventType.RECOVER_PASSWORD, payload: email});
  }

  public ngOnDestroy() {
    if (this.stateSubscription)
      this.stateSubscription.unsubscribe();
    this.helper.clearErrorSuccessState();
  }
}
