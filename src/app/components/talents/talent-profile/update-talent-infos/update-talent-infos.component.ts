import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Talent, TalentRequest} from "../../../../models/talent.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {EventService} from "../../../../services/event.service";
import {EventType} from "../../../../state/event-type.enum";
import {LocationService} from "../../../../services/location.service";
import {Subscription} from "rxjs";
import {Helper} from "../../../../helper/helper";
import {ErrorSuccessState} from "../../../../state/states.model";

@Component({
  selector: 'app-update-talent-infos',
  templateUrl: './update-talent-infos.component.html',
  styleUrl: './update-talent-infos.component.css'
})
export class UpdateTalentInfosComponent implements OnInit, OnDestroy {

  private eventService: EventService = inject(EventService);

  private formBuilder: FormBuilder = inject(FormBuilder);

  private locationService: LocationService = inject(LocationService);

  @Input()
  public talent !: Talent;

  public talentForm !: FormGroup;

  public cities !: Array<string>;

  private helper: Helper = inject(Helper);
  private errorSuccessSubscription !: Subscription;
  public errorSuccessState : ErrorSuccessState = {};

  public ngOnInit() {

    this.locationService.getCities().subscribe(
      (cities: Array<string>) => this.cities = cities
    );

    if (this.talent) {
      this.talentForm = this.formBuilder.group({
        lastName: this.formBuilder.control(this.talent.lastName),
        firstName: this.formBuilder.control(this.talent.firstName),
        email: this.formBuilder.control(this.talent.email),
        phone: this.formBuilder.control(this.talent.phone),
        title: this.formBuilder.control(this.talent.title),
        available: this.formBuilder.control(this.talent.available),
        summary: this.formBuilder.control(this.talent.summary),
        dateOfBirth: this.formBuilder.control(this.talent.dateOfBirth),
        city: this.formBuilder.control(this.talent.city),
        address: this.formBuilder.control(this.talent.address),
      });
    }

    this.errorSuccessSubscription = this.helper.subscribeToErrorSuccessState(this.errorSuccessState);

  }

  public handleCloseUpdateTalentForm(): void {
    this.eventService.dispatchEvent({eventType: EventType.CLOSE_UPDATE_TALENT_PROFILE});
  }

  public handleUpdateProfile(): void {
    let talentRequest: TalentRequest = this.talentForm.value;
    this.eventService.dispatchEvent({eventType: EventType.UPDATE_TALENT_PROFILE, payload: talentRequest})
  }

  public ngOnDestroy() {
    if(this.errorSuccessSubscription)
      this.errorSuccessSubscription.unsubscribe();
  }
}
