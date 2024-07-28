import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {EventService} from "../../../../../services/event.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Language} from "../../../../../models/language.model";
import {EventType} from "../../../../../state/event-type.enum";
import {Helper} from "../../../../../helper/helper";
import {Subscription} from "rxjs";
import {ErrorSuccessState} from "../../../../../state/states.model";

@Component({
  selector: 'app-edit-language',
  templateUrl: './edit-language.component.html',
  styleUrl: './edit-language.component.css'
})
export class EditLanguageComponent implements OnInit, OnDestroy{

  private eventService : EventService = inject(EventService);
  private formBuilder : FormBuilder = inject(FormBuilder);

  public languageForm !: FormGroup;

  @Input()
  public language !: Language;

  private helper: Helper = inject(Helper);
  private errorSuccessSubscription !: Subscription;
  public errorSuccessState : ErrorSuccessState = {};


  public ngOnInit() : void {
    if(this.language){
      this.languageForm = this.formBuilder.group({
        id : this.formBuilder.control(this.language.id),
        title : this.formBuilder.control(this.language.title),
        level : this.formBuilder.control(this.language.level)
      });
    }

    this.errorSuccessSubscription = this.helper.subscribeToErrorSuccessState(this.errorSuccessState);

  }

  public handleUpdateLanguage() : void {
    let language : Language = this.languageForm.value;
    this.eventService.dispatchEvent({eventType : EventType.UPDATE_LANGUAGE, payload : language});
  }

  public handleCloseEditLanguage() : void {
    this.eventService.dispatchEvent({eventType : EventType.CLOSE_EDIT_LANGUAGE});
  }

  public ngOnDestroy(): void {
    if(this.errorSuccessSubscription)
      this.errorSuccessSubscription.unsubscribe();
  }

}
