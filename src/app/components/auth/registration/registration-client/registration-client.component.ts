import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EventService} from "../../../../services/event.service";
import {EventType} from "../../../../state/event-type.enum";
import {Subscription} from "rxjs";
import {ClientRegistration} from "../../../../models/registration.model";
import {Helper} from "../../../../helper/helper";
import {ErrorSuccessState} from "../../../../state/states.model";

@Component({
  selector: 'app-registration-client',
  templateUrl: './registration-client.component.html',
  styleUrl: './registration-client.component.css'
})
export class RegistrationClientComponent implements OnInit, OnDestroy {

  private eventService: EventService = inject(EventService);
  private stateSubscription !: Subscription;
  private helper: Helper = inject(Helper);

  private formBuilder: FormBuilder = inject(FormBuilder);

  public clientRegistration !: FormGroup;

  public errorSuccessState : ErrorSuccessState = {};

  public ngOnInit(): void {

    this.clientRegistration = this.formBuilder.group({
      lastName: this.formBuilder.control(null),
      firstName: this.formBuilder.control(null),
      email: this.formBuilder.control(null),
      password: this.formBuilder.control(null),
      phone: this.formBuilder.control(null),
      sector: this.formBuilder.control(null),
      country: this.formBuilder.control(""),
      city: this.formBuilder.control(""),
      type: this.formBuilder.control("PERSONNEL"),
      companyName: this.formBuilder.control(null),
      website: this.formBuilder.control(null),
      size: this.formBuilder.control("")
    });

    this.stateSubscription = this.helper.subscribeToErrorSuccessState(this.errorSuccessState);
  }

  public handleRegistration(): void {
    let clientRegistration: ClientRegistration = this.clientRegistration.value;
    let type = this.clientRegistration.value.type;
    if (type == 'PERSONNEL') {
      clientRegistration.companyName = null;
      clientRegistration.website = null;
      clientRegistration.size = null;
    }
    this.eventService.dispatchEvent({eventType: EventType.REGISTER_CLIENT, payload: clientRegistration});
  }

  public ngOnDestroy() {
    if (this.stateSubscription)
      this.stateSubscription.unsubscribe();
    this.helper.clearErrorSuccessState();
  }

}
