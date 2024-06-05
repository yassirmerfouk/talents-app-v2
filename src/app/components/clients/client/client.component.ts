import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Client} from "../../../models/client.model";
import {ActivatedRoute} from "@angular/router";
import {Store} from "../../../state/store.service";
import {EventService} from "../../../services/event.service";
import {Subscription} from "rxjs";
import {EventType} from "../../../state/event-type.enum";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit, OnDestroy {

  private store: Store = inject(Store);
  private eventService: EventService = inject(EventService);
  private stateSubscription !: Subscription;

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  private id !: number;
  public client !: Client;

  public ngOnInit(): void {

    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        if (this.id)
          this.getClient();
      }
    );

    this.stateSubscription = this.store.state$.subscribe(
      (state: any) => {
        this.client = state.clientState.client;
      }
    );
  }

  public getClient(): void {
    this.eventService.dispatchEvent({eventType: EventType.GET_CLIENT, payload: this.id});
  }

  public ngOnDestroy(): void {
    if (this.stateSubscription)
      this.stateSubscription.unsubscribe();
  }
}
