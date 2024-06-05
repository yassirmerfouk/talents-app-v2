import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
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
export class LoginComponent implements OnInit, OnDestroy{

  private store : Store = inject(Store);
  private eventService : EventService = inject(EventService);
  private stateSubscription !: Subscription;

  private formBuilder : FormBuilder = inject(FormBuilder);

  private toast : NgToastService = inject(NgToastService);

  public login !: FormGroup;

  public error !: string;
  public errors !: any;
  public successMessage !: string;

  public ngOnInit() : void {

    this.login = this.formBuilder.group({
      email : this.formBuilder.control(null),
      password : this.formBuilder.control(null)
    });

    this.stateSubscription = this.store.state$.subscribe(
      (state : any) => {
        this.error = state.loginState.error;
        this.errors = state.loginState.errors ? new Map(Object.entries(state.loginState.errors)) : new Map;
        this.successMessage = state.loginState.successMessage;
        if(this.error)
          this.toast.danger(this.error);
      }
    );
  }

  public handleLogin() : void{
    let authenticationRequest : AuthenticationRequest = this.login.value;
    this.eventService.dispatchEvent({eventType : EventType.LOGIN, payload : authenticationRequest});
  }

  public ngOnDestroy() {
    if(this.stateSubscription)
      this.stateSubscription.unsubscribe();
  }
}
