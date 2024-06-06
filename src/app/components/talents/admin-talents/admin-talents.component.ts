import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {TalentService} from "../../../services/talent.service";
import {Page} from "../../../models/page.model";
import {Talent} from "../../../models/talent.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {Store} from "../../../state/store.service";
import {EventService} from "../../../services/event.service";
import {Subscription} from "rxjs";
import {EventType} from "../../../state/event-type.enum";

@Component({
  selector: 'app-admin-talents',
  templateUrl: './admin-talents.component.html',
  styleUrl: './admin-talents.component.css'
})
export class AdminTalentsComponent implements OnInit, OnDestroy{

  private store: Store = inject(Store);
  private eventService: EventService = inject(EventService);
  private stateSubscription !: Subscription;

  private formBuilder: FormBuilder = inject(FormBuilder);
  private router : Router = inject(Router);

  public talentsPage !: Page<Talent>;

  private page : number = 0;
  private size : number = 10;
  private status : string = "all";

  public filterForm !: FormGroup;

  public ngOnInit() : void {

    this.filterForm = this.formBuilder.group({
      status: this.formBuilder.control("all"),
    });

    this.stateSubscription = this.store.state$.subscribe(
      (state : any) => {
        this.talentsPage = state.talentsState.talentsPage;
      }
    );

    this.getTalents();
  }

  public getTalents() : void {
    this.eventService.dispatchEvent({eventType : EventType.GET_TALENTS, payload : {status : this.status, page : this.page, size : this.size}});
  }

  public handleChangeStatus() : void {
    this.status = this.filterForm.value.status;
    this.page = 0;
    this.getTalents();
  }

  public handleDisplayTalent(id : number) : void {
    this.router.navigateByUrl(`talent/${id}`);
  }

  public handleVerifyUser(talent : Talent) : void {
    this.eventService.dispatchEvent({eventType : EventType.VERIFY_USER, payload : talent});
  }

  public handleBanUser(talent : Talent) : void {
    this.eventService.dispatchEvent({eventType : EventType.BAN_USER, payload : talent});
  }

  public handlePermitUser(talent : Talent) : void {
    this.eventService.dispatchEvent({eventType : EventType.PERMIT_USER, payload : talent});
  }

  public handleChangePage(page : number) : void {
    this.page = page;
    this.getTalents();
  }

  public handlePreviousPage() : void {
    this.page--;
    this.getTalents();
  }

  public handleNextPage() : void{
    this.page++;
    this.getTalents();
  }

  public ngOnDestroy() {
    if(this.stateSubscription)
      this.stateSubscription.unsubscribe();
  }
}
