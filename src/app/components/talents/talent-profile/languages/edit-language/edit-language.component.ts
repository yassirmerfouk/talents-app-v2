import {Component, inject, Input} from '@angular/core';
import {EventService} from "../../../../../services/event.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Language} from "../../../../../models/language.model";
import {EventType} from "../../../../../state/event-type.enum";

@Component({
  selector: 'app-edit-language',
  templateUrl: './edit-language.component.html',
  styleUrl: './edit-language.component.css'
})
export class EditLanguageComponent {

  private eventService : EventService = inject(EventService);
  private formBuilder : FormBuilder = inject(FormBuilder);

  public languageForm !: FormGroup;

  @Input()
  public language !: Language;

  public ngOnInit() : void {
    if(this.language){
      this.languageForm = this.formBuilder.group({
        id : this.formBuilder.control(this.language.id),
        title : this.formBuilder.control(this.language.title),
        level : this.formBuilder.control(this.language.level)
      });
    }
  }

  public handleUpdateLanguage() : void {
    let language : Language = this.languageForm.value;
    this.eventService.dispatchEvent({eventType : EventType.UPDATE_LANGUAGE, payload : language});
  }

  public handleCloseEditLanguage() : void {
    this.eventService.dispatchEvent({eventType : EventType.CLOSE_EDIT_LANGUAGE});
  }
}
