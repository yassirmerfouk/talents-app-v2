import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Language} from "../../../../models/language.model";
import {EventService} from "../../../../services/event.service";
import {ActionEvent} from "../../../../state/action-event.event";
import {EventType} from "../../../../state/event-type.enum";
import {Store} from "../../../../state/store.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrl: './languages.component.css'
})
export class LanguagesComponent implements OnInit, OnDestroy{

  private store : Store = inject(Store);
  private eventService : EventService = inject(EventService);
  private stateSubscription !: Subscription;

  @Input()
  public languages !: Array<Language>;

  public openAddLanguage : boolean = false;
  public openEditLanguage : boolean = false;

  @Input()
  public selectedLanguage !: Language;

  public ngOnInit() : void {
    this.stateSubscription = this.store.state$.subscribe(
      (state : any) => {
        this.openAddLanguage = state.languagesState?.openAddLanguage;
        this.openEditLanguage = state.languagesState?.openEditLanguage;
        this.selectedLanguage = state.languages?.selectedLanguage;
      }
    );
  }

  public handleOpenAddLanguage() : void {
    this.eventService.dispatchEvent({eventType : EventType.OPEN_ADD_LANGUAGE});
  }

  public ngOnDestroy() {
    if(this.stateSubscription)
      this.stateSubscription.unsubscribe();
  }
}
