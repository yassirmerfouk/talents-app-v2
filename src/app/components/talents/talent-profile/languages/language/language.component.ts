import {Component, inject, Input} from '@angular/core';
import {Language} from "../../../../../models/language.model";
import {EventService} from "../../../../../services/event.service";
import {EventType} from "../../../../../state/event-type.enum";

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrl: './language.component.css'
})
export class LanguageComponent {

  private eventService : EventService = inject(EventService);

  @Input()
  public language !: Language;

  public handleOpenEditLanguage(language : Language) : void {
    this.eventService.publishEvent({
      eventType : EventType.OPEN_EDIT_LANGUAGE,
      payload : language
    });
  }

  public handleDeleteLanguage(id : number) : void {
    this.eventService.publishEvent({
      eventType : EventType.DELETE_LANGUAGE,
      payload : id
    });
  }
}
