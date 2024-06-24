import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EventService} from "../../../../services/event.service";
import {EventType} from "../../../../state/event-type.enum";
import {JobRequest} from "../../../../models/job.model";

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.css'
})
export class AddJobComponent implements OnInit{

  private eventService : EventService = inject(EventService);
  private formBuilder : FormBuilder = inject(FormBuilder);

  public jobForm !: FormGroup;

  public ngOnInit()  : void{
    this.jobForm = this.formBuilder.group({
      title : this.formBuilder.control(null),
      sector : this.formBuilder.control(null),
      minSalary : this.formBuilder.control(""),
      maxSalary : this.formBuilder.control(""),
      currency : this.formBuilder.control(""),
      yearsOfExperiences : this.formBuilder.control(""),
      numberOfTalents : this.formBuilder.control(""),
      type : this.formBuilder.control(""),
      contractType : this.formBuilder.control(""),
      period : this.formBuilder.control(""),
      periodUnit : this.formBuilder.control(""),
      description : this.formBuilder.control(null),
      skills : this.formBuilder.control("")
    });
  }

  public handleCloseAddJob() : void {
    this.eventService.dispatchEvent({eventType : EventType.CLOSE_ADD_JOB});
  }

  public handleAddJob() : void {
    let jobRequest : JobRequest = this.jobForm.value;
    let skills : string = this.jobForm.value.skills;
    if(skills)
      jobRequest.skills = skills.split(" ");
    else
    jobRequest.skills = [];
    if(jobRequest.contractType == 'OPEN_ENDED'){
      jobRequest.period = null; jobRequest.periodUnit = null;
    }
    this.eventService.dispatchEvent({eventType : EventType.ADD_JOB, payload : jobRequest});
  }
}
