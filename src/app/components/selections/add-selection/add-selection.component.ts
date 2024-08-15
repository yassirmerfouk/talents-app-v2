import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {EventService} from "../../../services/event.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Helper} from "../../../helper/helper";
import {Subscription} from "rxjs";
import {ErrorSuccessState} from "../../../state/states.model";
import {Store} from "../../../state/store.service";
import {EventType} from "../../../state/event-type.enum";
import {Talent} from "../../../models/talent.model";
import {TalentService} from "../../../services/talent.service";
import {SelectionRequest} from "../../../models/selection.model";

@Component({
  selector: 'app-add-selection',
  templateUrl: './add-selection.component.html',
  styleUrl: './add-selection.component.css'
})
export class AddSelectionComponent implements OnInit, OnDestroy {

  private store: Store = inject(Store);
  private eventService: EventService = inject(EventService);
  private formBuilder: FormBuilder = inject(FormBuilder);

  private stateSubscription !: Subscription;

  public selectionForm !: FormGroup;

  public talents: Array<Talent> = [];
  public talentsIds: Array<number> = [];


  private helper: Helper = inject(Helper);
  private errorSuccessSubscription !: Subscription;
  public errorSuccessState: ErrorSuccessState = {};

  private talentService: TalentService = inject(TalentService);

  public ngOnInit(): void {

    this.stateSubscription = this.store.state$.subscribe(
      (state: any) => {
        this.talentsIds = state.localTalentsState?.localTalents;
        this.talentService.getTalentsByList(this.talentsIds).subscribe({
          next: (talents: Array<Talent>) => this.talents = talents
        });
      }
    );

    this.selectionForm = this.formBuilder.group({
      title: this.formBuilder.control(null),
      sector: this.formBuilder.control(null),
      description: this.formBuilder.control(null)
    });

    this.eventService.dispatchEvent({eventType: EventType.GET_TALENTS_IN_LOCAL});

    this.errorSuccessSubscription = this.helper.subscribeToErrorSuccessState(this.errorSuccessState);
  }

  public handleCloseAddSelection(): void {
    this.eventService.dispatchEvent({eventType: EventType.CLOSE_ADD_SELECTION});
  }

  public handleUnselectTalent(talentId : number) : void {
    this.eventService.dispatchEvent({eventType : EventType.UNSELECT_TALENT_IN_LOCAL, payload : talentId});
  }

  public handleAddSelection(): void {
    if (this.talents.length == 0)
      alert("Please try to select some talents before adding a selection!");
    else {
      let selection: SelectionRequest = this.selectionForm.value;
      selection.talentsIds = this.talentsIds;
      this.eventService.dispatchEvent({eventType: EventType.ADD_SELECTION, payload: selection});
    }
  }

  public ngOnDestroy(): void {
    if (this.stateSubscription)
      this.stateSubscription.unsubscribe();
    if (this.errorSuccessSubscription)
      this.errorSuccessSubscription.unsubscribe();
  }
}
