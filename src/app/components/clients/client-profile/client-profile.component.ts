import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Client, ClientRequest} from "../../../models/client.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {EventService} from "../../../services/event.service";
import {EventType} from "../../../state/event-type.enum";
import {Store} from "../../../state/store.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.css'
})
export class ClientProfileComponent implements OnInit, OnDestroy {

  private store: Store = inject(Store);
  private eventService: EventService = inject(EventService);
  private stateSubscription !: Subscription;

  private formBuilder: FormBuilder = inject(FormBuilder);

  public client !: Client;

  public clientForm !: FormGroup;
  public imageForm !: FormGroup;

  private image !: File;

  public ngOnInit(): void {

    this.stateSubscription = this.store.state$.subscribe(
      (state: any) => {
        this.client = state.clientState.client;
        let image = state.clientState.image;
        if (this.client) {
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
            size: this.formBuilder.control(this.client.size),
          });
          this.imageForm = this.formBuilder.group({
            image: this.formBuilder.control(null)
          });
        }
        if(image)
          this.client.image = image;
      }
    );

    this.getClientProfile();
  }

  private getClientProfile(): void {
    this.eventService.dispatchEvent({eventType: EventType.GET_CLIENT_PROFILE});
  }

  public handleSelectImage($event: any): void {
    this.image = $event.target.files.item(0);
  }

  public handleUpdateProfile(): void {
    let clientRequest: ClientRequest = this.clientForm.value;
    this.eventService.dispatchEvent({
      eventType: EventType.UPDATE_CLIENT_PROFILE,
      payload: clientRequest
    });
  }

  public handleUpdateImage(): void {
    this.eventService.dispatchEvent({eventType: EventType.UPDATE_IMAGE, payload : this.image});
  }

  public handleAskForVerification(): void {
    this.eventService.dispatchEvent({eventType: EventType.ASK_VERIFICATION, payload : this.client});
  }

  public ngOnDestroy(): void {
    if (this.stateSubscription)
      this.stateSubscription.unsubscribe();
  }
}
