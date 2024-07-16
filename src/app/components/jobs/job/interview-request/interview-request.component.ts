import {Component, inject, Input, OnInit} from '@angular/core';
import {Application} from "../../../../models/application.model";
import {EventType} from "../../../../state/event-type.enum";
import {EventService} from "../../../../services/event.service";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-interview-request',
  templateUrl: './interview-request.component.html',
  styleUrl: './interview-request.component.css'
})
export class InterviewRequestComponent implements OnInit{

  private eventService : EventService = inject(EventService);

  private formBuilder : FormBuilder = inject(FormBuilder);

  public interviewForm !: FormGroup;

  @Input()
  public application !: Application;

  public totalDates : number = 3;

  public ngOnInit() : void {
   if(this.application){
     this.interviewForm = this.formBuilder.group({
       message : this.formBuilder.control(null,),
       dates : new FormArray([
         this.formBuilder.control(null)
       ])
     });
   }
  }

  get dates() {
    return this.interviewForm.get('dates') as FormArray;
  }

  public handleAddDateField() : void {
    if(this.dates.length < this.totalDates)
    this.dates.push(this.formBuilder.control(null));
  }

  public handleCloseAskForJobInterview() : void {
    this.eventService.dispatchEvent({eventType : EventType.CLOSE_ASK_FOR_JOB_INTERVIEW});
  }
}
