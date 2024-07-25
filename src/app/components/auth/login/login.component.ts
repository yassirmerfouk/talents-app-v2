import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationRequest} from "../../../models/authentication.model";
import {EventService} from "../../../services/event.service";
import {EventType} from "../../../state/event-type.enum";
import {Subscription} from "rxjs";
import {Helper} from "../../../helper/helper";
import {ErrorSuccessState} from "../../../state/states.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  private eventService: EventService = inject(EventService);
  private stateSubscription !: Subscription;
  public helper: Helper = inject(Helper);

  private formBuilder: FormBuilder = inject(FormBuilder);

  public login !: FormGroup;

  public errorSuccessState : ErrorSuccessState = {};

  public ngOnInit(): void {

    this.login = this.formBuilder.group({
      email: this.formBuilder.control(null, [Validators.required, Validators.email]),
      password: this.formBuilder.control(null, [Validators.required, Validators.minLength(8)])
    });

    this.stateSubscription = this.helper.subscribeToErrorSuccessState(this.errorSuccessState);

  }

  public handleLogin(): void {
    let authenticationRequest: AuthenticationRequest = this.login.value;
    this.eventService.dispatchEvent({eventType: EventType.LOGIN, payload: authenticationRequest});
  }

  public ngOnDestroy() {
    if (this.stateSubscription)
      this.stateSubscription.unsubscribe();
    this.helper.clearErrorSuccessState();
  }
}
