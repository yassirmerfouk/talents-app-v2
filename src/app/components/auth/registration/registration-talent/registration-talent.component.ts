import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TalentRegistration} from "../../../../models/registration.model";
import {EventService} from "../../../../services/event.service";
import {EventType} from "../../../../state/event-type.enum";
import {Subscription} from "rxjs";
import {LocationService} from "../../../../services/location.service";
import {Helper} from "../../../../helper/helper";
import {ErrorSuccessState} from "../../../../state/states.model";

@Component({
  selector: 'app-registration-talent',
  templateUrl: './registration-talent.component.html',
  styleUrl: './registration-talent.component.css'
})
export class RegistrationTalentComponent implements OnInit, OnDestroy {

  private eventService: EventService = inject(EventService);
  private stateSubscription !: Subscription;
  private helper: Helper = inject(Helper);

  private formBuilder: FormBuilder = inject(FormBuilder);

  private locationService: LocationService = inject(LocationService);

  public talentRegistration !: FormGroup;

  public cities !: Array<string>;

  public errorSuccessState: ErrorSuccessState = {};


  public ngOnInit(): void {

    this.locationService.getCities().subscribe({
      next: (cities: Array<string>) => {
        this.cities = cities;
        this.talentRegistration = this.formBuilder.group({
          lastName: this.formBuilder.control(null),
          firstName: this.formBuilder.control(null),
          email: this.formBuilder.control(null),
          password: this.formBuilder.control(null),
          phone: this.formBuilder.control(null),
          title: this.formBuilder.control(null),
          dateOfBirth: this.formBuilder.control(null),
          city: this.formBuilder.control("")
        });
      }
    });

    this.stateSubscription = this.helper.subscribeToErrorSuccessState(this.errorSuccessState);

  }

  public handleRegistration(): void {
    let talentRegistration: TalentRegistration = this.talentRegistration.value;
    this.eventService.dispatchEvent({eventType: EventType.REGISTER_TALENT, payload: talentRegistration})
  }

  public ngOnDestroy() {
    if (this.stateSubscription)
      this.stateSubscription.unsubscribe();
    this.helper.clearErrorSuccessState();
  }
}
