import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Page} from "../../../models/page.model";
import {Client} from "../../../models/client.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Store} from "../../../state/store.service";
import {EventService} from "../../../services/event.service";
import {Subscription} from "rxjs";
import {EventType} from "../../../state/event-type.enum";
import {User} from "../../../models/user.model";
import {Helper} from "../../../helper/helper";
import {ErrorSuccessState} from "../../../state/states.model";

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

  public openProgramMeet: boolean = false;
  public selectedUser: User | null = null;

  private helper: Helper = inject(Helper);
  private errorSuccessSubscription !: Subscription;
  public errorSuccessState: ErrorSuccessState = {};

  public ngOnInit(): void {

    this.stateSubscription = this.store.state$.subscribe(
      (state: any) => {
        this.clientsPage = state.clientsState?.clientsPage;
        this.openProgramMeet = state.meetState?.openProgramMeet;
        this.selectedUser = state.meetState?.selectedUser;
      }
    );

    this.errorSuccessSubscription = this.helper.subscribeToErrorSuccessState(this.errorSuccessState);

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
    if (confirm("Are you sure to verify that client?"))
      this.eventService.dispatchEvent({eventType: EventType.VERIFY_USER, payload: client});
  }

  public handleBanUser(client: Client): void {
    if (confirm("Are you sure to ban that client?"))
    this.eventService.dispatchEvent({eventType: EventType.BAN_USER, payload: client});
  }

  public handlePermitUser(client: Client): void {
    if (confirm("Are you sure to permit that client?"))
    this.eventService.dispatchEvent({eventType: EventType.PERMIT_USER, payload: client});
  }

  public handleOpenProgramMeet(user: User): void {
    this.eventService.dispatchEvent({eventType: EventType.OPEN_ADD_MEET, payload: user});
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
    if (this.errorSuccessSubscription)
      this.errorSuccessSubscription.unsubscribe();
  }

}
