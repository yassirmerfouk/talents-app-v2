import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Store} from "../../../state/store.service";
import {EventService} from "../../../services/event.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AuthStateService} from "../../../services/auth.state.service";
import {EventType} from "../../../state/event-type.enum";
import {ItemResponse, Selection} from "../../../models/selection.model";

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.css'
})
export class SelectionComponent implements OnInit, OnDestroy {

  private store: Store = inject(Store);
  private eventService: EventService = inject(EventService);
  private stateSubscription !: Subscription;

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  public authStateService: AuthStateService = inject(AuthStateService);

  private id !: number;
  public selection !: Selection;

  public openSelectionReport : boolean = false;
  public selectedItem !: ItemResponse;

  public ngOnInit(): void {

    this.stateSubscription = this.store.state$.subscribe(
      (state: any) => {
        this.selection = state.selectionState?.selection;
        this.openSelectionReport = state.selectionState?.openSelectionReport;
        this.selectedItem = state.selectionState?.selectedItem;
      }
    );

    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        if (this.id)
          this.getSelection();
      });
  }

  public getSelection(): void {
    this.eventService.dispatchEvent({eventType: EventType.GET_SELECTION, payload: this.id});
  }

  public handleOpenSelectionReport(item : ItemResponse) : void {
    this.eventService.dispatchEvent({eventType : EventType.OPEN_SELECTION_REPORT, payload : item});
  }

  public ngOnDestroy(): void {
    if(this.stateSubscription)
      this.stateSubscription.unsubscribe();
  }

}
