import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TalentRegistration} from "../../../../models/registration.model";
import {EventService} from "../../../../services/event.service";
import {EventType} from "../../../../state/event-type.enum";
import {Store} from "../../../../state/store.service";
import {Subscription} from "rxjs";
import {LocationService} from "../../../../services/location.service";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-registration-talent',
  templateUrl: './registration-talent.component.html',
  styleUrl: './registration-talent.component.css'
})
export class RegistrationTalentComponent implements OnInit, OnDestroy {

  private store: Store = inject(Store);
  private eventService: EventService = inject(EventService);
  private stateSubscription !: Subscription;

  private formBuilder: FormBuilder = inject(FormBuilder);

  private locationService: LocationService = inject(LocationService);

  private toast: NgToastService = inject(NgToastService);

  public talentRegistration !: FormGroup;

  public error !: string;
  public errors !: any;
  public successMessage !: string;

  public cities !: Array<string>;

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

  public handleRegistration(): void {
    let talentRegistration: TalentRegistration = this.talentRegistration.value;
    this.eventService.dispatchEvent({eventType: EventType.REGISTER_TALENT, payload: talentRegistration})
  }

  public ngOnDestroy() {
    if (this.stateSubscription)
      this.stateSubscription.unsubscribe();
    this.store.clearErrorSuccessState();
  }
}
