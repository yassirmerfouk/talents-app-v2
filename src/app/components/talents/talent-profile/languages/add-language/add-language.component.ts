import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Language} from "../../../../../models/language.model";
import {EventService} from "../../../../../services/event.service";
import {EventType} from "../../../../../state/event-type.enum";
import {Helper} from "../../../../../helper/helper";
import {ErrorSuccessState} from "../../../../../state/states.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.component.html',
  styleUrl: './add-language.component.css'
})
export class AddLanguageComponent implements OnInit, OnDestroy{

  private eventService : EventService = inject(EventService);
  private formBuilder : FormBuilder = inject(FormBuilder);

  public languageForm !: FormGroup;

  private helper: Helper = inject(Helper);
  private errorSuccessSubscription !: Subscription;
  public errorSuccessState : ErrorSuccessState = {};

  public ngOnInit() : void {
    this.languageForm = this.formBuilder.group({
      title : this.formBuilder.control(null),
      level : this.formBuilder.control("")
    });
    this.errorSuccessSubscription = this.helper.subscribeToErrorSuccessState(this.errorSuccessState);
  }

  public handleAddLanguage() : void {
    let language : Language = this.languageForm.value;
    this.eventService.dispatchEvent({eventType : EventType.ADD_LANGUAGE, payload : language});
  }

  public handleCloseAddLanguage() : void {
    this.eventService.dispatchEvent({eventType : EventType.CLOSE_ADD_LANGUAGE});
  }

  public ngOnDestroy(): void {
    if(this.errorSuccessSubscription)
      this.errorSuccessSubscription.unsubscribe();
  }
}
