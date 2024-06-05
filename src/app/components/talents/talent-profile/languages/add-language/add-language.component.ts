import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Language} from "../../../../../models/language.model";
import {EventService} from "../../../../../services/event.service";
import {EventType} from "../../../../../state/event-type.enum";

@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.component.html',
  styleUrl: './add-language.component.css'
})
export class AddLanguageComponent implements OnInit{

  private eventService : EventService = inject(EventService);
  private formBuilder : FormBuilder = inject(FormBuilder);

  public languageForm !: FormGroup;

  public ngOnInit() : void {
    this.languageForm = this.formBuilder.group({
      title : this.formBuilder.control(null),
      level : this.formBuilder.control("")
    });
  }

  public handleAddLanguage() : void {
    let language : Language = this.languageForm.value;
    this.eventService.publishEvent({
      eventType : EventType.ADD_LANGUAGE,
      payload : language
    });
  }

  public handleCloseAddLanguage() : void {
    this.eventService.publishEvent({
      eventType : EventType.CLOSE_ADD_LANGUAGE
    });
  }
}
