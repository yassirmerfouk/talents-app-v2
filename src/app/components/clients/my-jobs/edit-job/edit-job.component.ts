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
      console.log(this.job);
      this.jobForm = this.formBuilder.group({
        id : this.formBuilder.control(this.job.id),
        title : this.formBuilder.control(this.job.title),
        sector : this.formBuilder.control(this.job.sector),
        minSalary : this.formBuilder.control(this.job.minSalary),
        maxSalary : this.formBuilder.control(this.job.maxSalary),
        currency : this.formBuilder.control(this.job.currency),
        yearsOfExperiences : this.formBuilder.control(this.job.yearsOfExperiences),
        numberOfTalents : this.formBuilder.control(this.job.numberOfTalents),
        type : this.formBuilder.control(this.job.type),
        contractType : this.formBuilder.control(this.job.contractType),
        period : this.formBuilder.control(this.job.period),
        periodUnit : this.formBuilder.control(this.job.periodUnit),
        description : this.formBuilder.control(this.job.description),
        skills : this.formBuilder.control(this.job.skills.join(" "))
      });
    }
  }

  public handleUpdateJob() : void {
    let jobRequest : JobRequest = this.jobForm.value;
    if(this.jobForm.value.skills)
      jobRequest.skills = this.jobForm.value.skills.split(" ");
    else
      jobRequest.skills = [];
    this.eventService.dispatchEvent({eventType : EventType.UPDATE_JOB, payload : jobRequest});
  }

  public handleCloseEditJob() : void {
    this.eventService.dispatchEvent({eventType : EventType.CLOSE_EDIT_JOB});
  }
}
