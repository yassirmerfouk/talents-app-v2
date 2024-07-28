import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EventService} from "../../../../services/event.service";
import {EventType} from "../../../../state/event-type.enum";
import {JobRequest} from "../../../../models/job.model";
import {SkillService} from "../../../../services/skill.service";
import {Helper} from "../../../../helper/helper";
import {Subscription} from "rxjs";
import {ErrorSuccessState} from "../../../../state/states.model";

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.css'
})
export class AddJobComponent implements OnInit, OnDestroy {

  private eventService: EventService = inject(EventService);
  private formBuilder: FormBuilder = inject(FormBuilder);

  private skillService: SkillService = inject(SkillService);

  public jobForm !: FormGroup;

  public skillsList: Array<string> = [];

  public existedSkills: Array<string> = [];

  public searchedSkills: Array<string> = [];

  private helper: Helper = inject(Helper);
  private errorSuccessSubscription !: Subscription;
  public errorSuccessState : ErrorSuccessState = {};

  public ngOnInit(): void {
    this.skillService.getSkills().subscribe({
      next: (skills: Array<any>) => {

        this.jobForm = this.formBuilder.group({
          title: this.formBuilder.control(null),
          sector: this.formBuilder.control(null),
          minSalary: this.formBuilder.control(""),
          maxSalary: this.formBuilder.control(""),
          currency: this.formBuilder.control(""),
          yearsOfExperiences: this.formBuilder.control(""),
          numberOfTalents: this.formBuilder.control(""),
          type: this.formBuilder.control(""),
          contractType: this.formBuilder.control(""),
          period: this.formBuilder.control(""),
          periodUnit: this.formBuilder.control(""),
          description: this.formBuilder.control(null),
          skill: this.formBuilder.control("")
        });

        this.existedSkills = skills.map(skill => skill.title);

        this.jobForm.get('skill')?.valueChanges.subscribe((value: string) => {
          if (value)
            this.searchedSkills = this.existedSkills.filter(skill => skill.includes(value.toUpperCase()));
          else
            this.searchedSkills = [];
        });
      }
    });

    this.errorSuccessSubscription = this.helper.subscribeToErrorSuccessState(this.errorSuccessState);

  }

  public handleCloseAddJob(): void {
    this.eventService.dispatchEvent({eventType: EventType.CLOSE_ADD_JOB});
  }

  public handleAddSkill(skill: string): void {
    skill = skill.toUpperCase();
    if (!this.skillsList.includes(skill))
      this.skillsList.push(skill);
  }

  public handleDeleteSkill(skill: string): void {
    this.skillsList = this.skillsList.filter(x => x != skill);
  }

  public handleAddJob(): void {
    let jobRequest: JobRequest = this.jobForm.value;
    jobRequest.skills = this.skillsList;
    if (jobRequest.contractType == 'OPEN_ENDED') {
      jobRequest.period = null;
      jobRequest.periodUnit = null;
    }
    this.eventService.dispatchEvent({eventType: EventType.ADD_JOB, payload: jobRequest});
  }

  public ngOnDestroy(): void {
    if(this.errorSuccessSubscription)
      this.errorSuccessSubscription.unsubscribe();
  }
}
