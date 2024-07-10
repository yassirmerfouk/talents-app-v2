import {Component, inject, Input, OnInit} from '@angular/core';
import {Talent, TalentRequest} from "../../../../models/talent.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {EventService} from "../../../../services/event.service";
import {EventType} from "../../../../state/event-type.enum";
import {LocationService} from "../../../../services/location.service";

@Component({
  selector: 'app-update-talent-infos',
  templateUrl: './update-talent-infos.component.html',
  styleUrl: './update-talent-infos.component.css'
})
export class UpdateTalentInfosComponent implements OnInit{

  private formBuilder : FormBuilder = inject(FormBuilder);

  private eventService : EventService = inject(EventService);

  private locationService : LocationService = inject(LocationService);

  @Input()
  public talent !: Talent;

  public talentForm !: FormGroup;

  public cities !: Array<string>;

  public ngOnInit() {

    this.locationService.getCities().subscribe(
      (cities : Array<string>) => this.cities = cities
    );

    if(this.talent){
      this.talentForm = this.formBuilder.group({
        lastName: this.formBuilder.control(this.talent.lastName),
        firstName: this.formBuilder.control(this.talent.firstName),
        email: this.formBuilder.control(this.talent.email),
        phone: this.formBuilder.control(this.talent.phone),
        title: this.formBuilder.control(this.talent.title),
        summary: this.formBuilder.control(this.talent.summary),
        dateOfBirth: this.formBuilder.control(this.talent.dateOfBirth),
        city: this.formBuilder.control(this.talent.city),
        address: this.formBuilder.control(this.talent.address),
      });
    }
  }

  public handleCloseUpdateTalentForm() : void {
    this.eventService.dispatchEvent({eventType : EventType.CLOSE_UPDATE_TALENT_PROFILE});
  }

    public handleUpdateProfile(): void {
    let talentRequest: TalentRequest = this.talentForm.value;
    this.eventService.dispatchEvent({eventType: EventType.UPDATE_TALENT_PROFILE, payload: talentRequest})
  }
}
