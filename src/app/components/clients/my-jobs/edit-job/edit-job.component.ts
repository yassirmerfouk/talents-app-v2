import {Component, inject, Input, OnInit} from '@angular/core';
import {Job, JobRequest} from "../../../../models/job.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {EventService} from "../../../../services/event.service";
import {EventType} from "../../../../state/event-type.enum";
import {SkillService} from "../../../../services/skill.service";

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrl: './edit-job.component.css'
})
export class EditJobComponent implements OnInit{

  private eventService : EventService = inject(EventService);
  private formBuilder : FormBuilder = inject(FormBuilder);

  private skillService : SkillService = inject(SkillService);

  @Input()
  public job !: Job;

  public jobForm !: FormGroup;

  public skillsList: Array<string> = [];

  public existedSkills: Array<string> = [];

  public searchedSkills: Array<string> = [];

  public ngOnInit()  : void{
    if(this.job){
      this.skillService.getSkills().subscribe({
        next : (skills : Array<any>) => {

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
            periodUnit : this.formBuilder.control(this.job.periodUnit ? this.job.periodUnit : ''),
            description : this.formBuilder.control(this.job.description),
            skill: this.formBuilder.control("")
          });

          this.skillsList = this.job.skills;

          this.existedSkills = skills.map(skill => skill.title);
          this.jobForm.get('skill')?.valueChanges.subscribe((value: string) => {
            if (value)
              this.searchedSkills = this.existedSkills.filter(skill => skill.includes(value.toUpperCase()));
            else
              this.searchedSkills = [];
          });

        }
      });
    }
  }

  public handleAddSkill(skill : string): void {
    skill = skill.toUpperCase();
    if (!this.skillsList.includes(skill))
      this.skillsList.push(skill);
  }

  public handleDeleteSkill(skill : string) : void {
    this.skillsList = this.skillsList.filter(x => x != skill);
  }

  public handleUpdateJob() : void {
    let jobRequest : JobRequest = this.jobForm.value;
    jobRequest.skills = this.skillsList;
    if(jobRequest.contractType == 'OPEN_ENDED'){
      jobRequest.period = null; jobRequest.periodUnit = null;
    }
    this.eventService.dispatchEvent({eventType : EventType.UPDATE_JOB, payload : jobRequest});
  }

  public handleCloseEditJob() : void {
    this.eventService.dispatchEvent({eventType : EventType.CLOSE_EDIT_JOB});
  }
}
