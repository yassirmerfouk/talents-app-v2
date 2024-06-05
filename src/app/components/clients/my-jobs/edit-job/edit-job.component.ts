import {Component, inject, Input, OnInit} from '@angular/core';
import {Job, JobRequest} from "../../../../models/job.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {EventService} from "../../../../services/event.service";
import {EventType} from "../../../../state/event-type.enum";

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrl: './edit-job.component.css'
})
export class EditJobComponent implements OnInit{

  private eventService : EventService = inject(EventService);
  private formBuilder : FormBuilder = inject(FormBuilder);

  @Input()
  public job !: Job;

  public jobForm !: FormGroup;

  public ngOnInit()  : void{
    if(this.job){
      this.jobForm = this.formBuilder.group({
        id : this.formBuilder.control(this.job.id),
        title : this.formBuilder.control(this.job.title),
        sector : this.formBuilder.control(this.job.sector),
        minSalary : this.formBuilder.control(this.job.minSalary),
        maxSalary : this.formBuilder.control(this.job.maxSalary),
        period : this.formBuilder.control(this.job.period),
        yearsOfExperiences : this.formBuilder.control(this.job.yearsOfExperiences),
        numberOfTalents : this.formBuilder.control(this.job.numberOfTalents),
        type : this.formBuilder.control(this.job.type),
        description : this.formBuilder.control(this.job.description)
      });
    }
  }

  public handleUpdateJob() : void {
    let jobRequest : JobRequest = this.jobForm.value;
    jobRequest.skills = [];
    this.eventService.publishEvent({
      eventType : EventType.UPDATE_JOB,
      payload : jobRequest
    });
  }

  public handleCloseEditJob() : void {
    this.eventService.publishEvent({eventType : EventType.CLOSE_EDIT_JOB});
  }
}
