import {Component, inject, Input, OnInit} from '@angular/core';
import {Language} from "../../../../models/language.model";
import {EventService} from "../../../../services/event.service";
import {ActionEvent} from "../../../../state/action-event.event";
import {EventType} from "../../../../state/event-type.enum";

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrl: './languages.component.css'
})
export class LanguagesComponent implements OnInit{

  private eventService : EventService = inject(EventService);

  @Input()
  public languages !: Array<Language>;

  public openAddLanguage : boolean = false;
  public openEditLanguage : boolean = false;

  @Input()
  public selectedLanguage !: Language;

  public ngOnInit() : void {
    this.eventService.event$.subscribe(
      ($event : ActionEvent) => this.handleEvent($event)
    );
  }

  public handleEvent($event : ActionEvent) : void{
    switch ($event.eventType){
      case EventType.OPEN_ADD_LANGUAGE :
        this.openAddLanguage = true;
        break;
      case EventType.CLOSE_ADD_LANGUAGE :
        this.openAddLanguage = false;
        break;
      case EventType.OPEN_EDIT_LANGUAGE :
        this.openEditLanguage = true;
        this.selectedLanguage = $event.payload;
        break;
      case EventType.CLOSE_EDIT_LANGUAGE :
        this.openEditLanguage = false;
        break;
    }
  }

  public handleOpenAddLanguage() : void {
    this.eventService.publishEvent({
      eventType : EventType.OPEN_ADD_LANGUAGE
    });
  }
}
