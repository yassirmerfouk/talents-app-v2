import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationRequest} from "../../../models/authentication.model";
import {EventService} from "../../../services/event.service";
import {EventType} from "../../../state/event-type.enum";
import {Store} from "../../../state/store.service";
import {Subscription} from "rxjs";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  private store: Store = inject(Store);
  private eventService: EventService = inject(EventService);
  private stateSubscription !: Subscription;

  private formBuilder: FormBuilder = inject(FormBuilder);

  private toast: NgToastService = inject(NgToastService);

  public login !: FormGroup;

  public error !: string;
  public errors !: any;
  public successMessage !: string;

  public ngOnInit(): void {

    this.login = this.formBuilder.group({
      email: this.formBuilder.control(null, [Validators.required, Validators.email]),
      password: this.formBuilder.control(null, [Validators.required, Validators.minLength(8)])
    });

    this.stateSubscription = this.store.state$.subscribe(
      (state: any) => {
        this.error = state.errorSuccessState?.error;
        this.errors = state.errorSuccessState?.errors ? new Map(Object.entries(state.errorSuccessState.errors)) : new Map;
        this.successMessage = state.errorSuccessState?.successMessage;
        if (this.error)
          this.toast.danger(this.error,"", 5000);
        if(this.successMessage)
          this.toast.success(this.successMessage,"", 5000);
      }
    );
  }

  public handleLogin(): void {
    let authenticationRequest: AuthenticationRequest = this.login.value;
    this.eventService.dispatchEvent({eventType: EventType.LOGIN, payload: authenticationRequest});
  }

  public ngOnDestroy() {
    if (this.stateSubscription)
      this.stateSubscription.unsubscribe();
    this.store.clearErrorSuccessState();
  }
}
