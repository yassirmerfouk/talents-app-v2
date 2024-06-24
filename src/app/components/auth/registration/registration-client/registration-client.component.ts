import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EventService} from "../../../../services/event.service";
import {EventType} from "../../../../state/event-type.enum";
import {Store} from "../../../../state/store.service";
import {Subscription} from "rxjs";
import {NgToastService} from "ng-angular-popup";
import {ClientRegistration} from "../../../../models/registration.model";

@Component({
  selector: 'app-registration-client',
  templateUrl: './registration-client.component.html',
  styleUrl: './registration-client.component.css'
})
export class RegistrationClientComponent implements OnInit, OnDestroy{

  private store : Store = inject(Store);
  private eventService : EventService = inject(EventService);
  private stateSubscription !: Subscription;

  private formBuilder: FormBuilder = inject(FormBuilder);

  private toast : NgToastService = inject(NgToastService);

  public clientRegistration !: FormGroup;

  public error !: string;
  public errors !: any;
  public successMessage !: string;

  public ngOnInit(): void {

    this.clientRegistration = this.formBuilder.group({
      lastName: this.formBuilder.control(null),
      firstName: this.formBuilder.control(null),
      email: this.formBuilder.control(null),
      password: this.formBuilder.control(null),
      phone: this.formBuilder.control(null),
      sector : this.formBuilder.control(null),
      country : this.formBuilder.control(""),
      city : this.formBuilder.control(""),
      type : this.formBuilder.control("PERSONNEL"),
      companyName : this.formBuilder.control(null),
      website : this.formBuilder.control(null),
      size : this.formBuilder.control("")
    });

    this.stateSubscription = this.store.state$.subscribe(
      (state : any) => {
        this.error = state.registerClientState?.error;
        this.errors = this.errors = state.registerClientState?.errors ? new Map(Object.entries(state.registerClientState.errors)) : new Map;
        this.successMessage = state.registerClientState?.successMessage;
        if(this.error)
          this.toast.danger(this.error);
      }
    );
  }

  public handleRegistration() : void{
    let clientRegistration : ClientRegistration = this.clientRegistration.value;
    let type = this.clientRegistration.value.type;
    if(type == 'PERSONNEL'){
      clientRegistration.companyName = null;
      clientRegistration.website = null;
      clientRegistration.size = null;
    }
    this.eventService.dispatchEvent({eventType : EventType.REGISTER_CLIENT, payload : clientRegistration});
  }

  public ngOnDestroy() {
    if(this.stateSubscription)
      this.stateSubscription.unsubscribe();
  }

}
