import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Client, ClientRequest} from "../../../../models/client.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {EventService} from "../../../../services/event.service";
import {EventType} from "../../../../state/event-type.enum";
import {Helper} from "../../../../helper/helper";
import {Subscription} from "rxjs";
import {ErrorSuccessState} from "../../../../state/states.model";

@Component({
  selector: 'app-update-client-infos',
  templateUrl: './update-client-infos.component.html',
  styleUrl: './update-client-infos.component.css'
})
export class UpdateClientInfosComponent implements OnInit, OnDestroy{

  private eventService : EventService = inject(EventService);

  private formBuilder: FormBuilder = inject(FormBuilder);

  public clientForm !: FormGroup;

  @Input()
  public client !: Client;

  private helper: Helper = inject(Helper);
  private errorSuccessSubscription !: Subscription;
  public errorSuccessState : ErrorSuccessState = {};

  public ngOnInit() : void {
    if(this.client){
      this.clientForm = this.formBuilder.group({
        lastName: this.formBuilder.control(this.client.lastName),
        firstName: this.formBuilder.control(this.client.firstName),
        email: this.formBuilder.control(this.client.email),
        phone: this.formBuilder.control(this.client.phone),
        sector: this.formBuilder.control(this.client.sector),
        country: this.formBuilder.control(this.client.country),
        city: this.formBuilder.control(this.client.city),
        shortDescription: this.formBuilder.control(this.client.shortDescription),
        type: this.formBuilder.control(this.client.type),
        companyName: this.formBuilder.control(this.client.companyName),
        website: this.formBuilder.control(this.client.website),
        size: this.formBuilder.control(this.client.size ? this.client.size : ''),
      });
    }

    this.errorSuccessSubscription = this.helper.subscribeToErrorSuccessState(this.errorSuccessState);
  }

  public handleCloseUpdateClientProfile() : void {
    this.eventService.dispatchEvent({eventType : EventType.CLOSE_UPDATE_CLIENT_PROFILE});
  }

  public handleUpdateProfile(): void {
    let clientRequest: ClientRequest = this.clientForm.value;
    if(clientRequest.type == 'PERSONNEL'){
      clientRequest.companyName = null;
      clientRequest.website = null;
      clientRequest.size = null;
    }
    this.eventService.dispatchEvent({eventType: EventType.UPDATE_CLIENT_PROFILE, payload: clientRequest});
  }

  public ngOnDestroy() : void {
    if(this.errorSuccessSubscription)
      this.errorSuccessSubscription.unsubscribe();
  }
}
