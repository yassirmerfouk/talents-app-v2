import {Component, inject, OnInit} from '@angular/core';
import {ClientService} from "../../../services/client.service";
import {Client, ClientRequest} from "../../../models/client.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {EventService} from "../../../services/event.service";
import {EventType} from "../../../state/event-type.enum";
import {ActionEvent} from "../../../state/action-event.event";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.css'
})
export class ClientProfileComponent implements OnInit {

  private eventService: EventService = inject(EventService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private clientService: ClientService = inject(ClientService);
  private userService: UserService = inject(UserService);

  public client !: Client;

  public clientForm !: FormGroup;
  public imageForm !: FormGroup;

  private image !: File;

  public ngOnInit(): void {
    this.clientService.profile().subscribe({
      next: (client: Client) => {
        this.client = client;
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
    });

    this.eventService.event$.subscribe(
      ($event: ActionEvent) => this.handleEvent($event)
    );
  }

  public handleSelectImage($event: any): void {
    this.image = $event.target.files.item(0);
  }

  public handleEvent($event: ActionEvent): void {
    switch ($event.eventType) {
      case EventType.UPDATE_CLIENT_PROFILE :
        this.updateClientProfile($event.payload);
        break;
      case EventType.UPDATE_IMAGE :
        this.updateImage();
        break;
      case EventType.ASK_VERIFICATION :
        this.askForVerification();
        break;
    }
  }

  public updateClientProfile(clientRequest: ClientRequest): void {
    this.clientService.updateProfile(clientRequest).subscribe({
      next: (client: Client) => this.client = client,
      error: (error: HttpErrorResponse) => console.log(error)
    });
  }

  private updateImage(): void {
    this.userService.updateImage(this.image).subscribe({
      next: (image: any) => {
        this.client.image = image;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  private askForVerification(): void {
    this.userService.askForVerification().subscribe({
      next: () => {
        this.client.status = 'WAITING';
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  public handleUpdateProfile(): void {
    let clientRequest: ClientRequest = this.clientForm.value;
    this.eventService.publishEvent({
      eventType: EventType.UPDATE_CLIENT_PROFILE,
      payload: clientRequest
    })
  }

  public handleUpdateImage(): void {
    this.eventService.publishEvent({eventType: EventType.UPDATE_IMAGE});
  }

  public handleAskForVerification(): void {
    this.eventService.publishEvent({eventType: EventType.ASK_VERIFICATION});
  }
}
