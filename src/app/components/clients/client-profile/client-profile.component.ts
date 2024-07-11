import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Client, ClientRequest} from "../../../models/client.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {EventService} from "../../../services/event.service";
import {EventType} from "../../../state/event-type.enum";
import {Store} from "../../../state/store.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.css'
})
export class ClientProfileComponent implements OnInit, OnDestroy {

  private store: Store = inject(Store);
  private eventService: EventService = inject(EventService);
  private stateSubscription !: Subscription;

  private authService : AuthService = inject(AuthService);

  private formBuilder: FormBuilder = inject(FormBuilder);

  public client !: Client;

  public imageForm !: FormGroup;

  private image !: File;

  public profileCompletion !: number;

  public openUpdateInfos : boolean = false;

  public ngOnInit(): void {

    this.stateSubscription = this.store.state$.subscribe(
      (state: any) => {
        this.client = state.clientState.client;
        let image = state.profileImage;
        if (this.client) {

          this.imageForm = this.formBuilder.group({
            image: this.formBuilder.control(null)
          });

          this.authService.getProfileCompletion().subscribe({
            next : (score : number) => this.profileCompletion = score
          });

          this.openUpdateInfos = state.clientState?.openUpdateInfos;

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

  public handleUpdateImage(): void {
    this.eventService.dispatchEvent({eventType: EventType.UPDATE_IMAGE, payload : this.image});
  }

  public handleAskForVerification(): void {
    this.eventService.dispatchEvent({eventType: EventType.ASK_VERIFICATION, payload : this.client});
  }

  public handleOpenUpdateClientProfile() : void {
    this.eventService.dispatchEvent({eventType : EventType.OPEN_UPDATE_CLIENT_PROFILE});
  }

  public ngOnDestroy(): void {
    if (this.stateSubscription)
      this.stateSubscription.unsubscribe();
  }
}
