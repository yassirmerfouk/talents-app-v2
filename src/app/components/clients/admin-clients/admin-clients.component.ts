import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Page} from "../../../models/page.model";
import {Client} from "../../../models/client.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Store} from "../../../state/store.service";
import {EventService} from "../../../services/event.service";
import {Subscription} from "rxjs";
import {EventType} from "../../../state/event-type.enum";

@Component({
  selector: 'app-admin-clients',
  templateUrl: './admin-clients.component.html',
  styleUrl: './admin-clients.component.css'
})
export class AdminClientsComponent implements OnInit, OnDestroy {

  private store: Store = inject(Store);
  private eventService: EventService = inject(EventService);
  private stateSubscription !: Subscription;

  private formBuilder: FormBuilder = inject(FormBuilder);

  public clientsPage !: Page<Client>;

  public status: string = "all";
  public page: number = 0;
  public size: number = 10;

  public filterForm !: FormGroup;

  public ngOnInit(): void {

    this.stateSubscription = this.store.state$.subscribe(
      (state: any) => {
        this.clientsPage = state.clientsState.clientsPage;
      }
    );

    this.filterForm = this.formBuilder.group({
      status: this.formBuilder.control("all"),
    });

    this.getClients();
  }

  public getClients(): void {
    this.eventService.dispatchEvent({
      eventType: EventType.GET_CLIENTS, payload: {status: this.status, page: this.page, size: this.size}
    });
  }

  public handleChangeStatus(): void {
    this.status = this.filterForm.value.status;
    this.page = 0;
    this.getClients();
  }

  public handleVerifyUser(client: Client): void {
    this.eventService.dispatchEvent({eventType: EventType.VERIFY_USER, payload: client});
  }

  public handleBanUser(client: Client): void {
    this.eventService.dispatchEvent({eventType: EventType.BAN_USER, payload: client});
  }

  public handlePermitUser(client: Client): void {
    this.eventService.dispatchEvent({eventType: EventType.PERMIT_USER, payload: client});
  }

  public handleChangePage(page: number): void {
    this.page = page;
    this.getClients();
  }

  public handlePreviousPage(): void {
    this.page--;
    this.getClients();
  }

  public handleNextPage(): void {
    this.page++;
    this.getClients();
  }

  public ngOnDestroy(): void {
    if (this.stateSubscription)
      this.stateSubscription.unsubscribe();
  }

}
