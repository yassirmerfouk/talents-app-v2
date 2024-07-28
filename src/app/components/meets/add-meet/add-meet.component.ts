import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../models/user.model";
import {EventService} from "../../../services/event.service";
import {EventType} from "../../../state/event-type.enum";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Meet} from "../../../models/meet.model";
import {Job} from "../../../models/job.model";
import {Helper} from "../../../helper/helper";
import {Subscription} from "rxjs";
import {ErrorSuccessState} from "../../../state/states.model";

@Component({
  selector: 'app-add-meet',
  templateUrl: './add-meet.component.html',
  styleUrl: './add-meet.component.css'
})
export class AddMeetComponent implements OnInit,OnDestroy {

  private eventService: EventService = inject(EventService);

  private formBuilder: FormBuilder = inject(FormBuilder);

  @Input()
  public type: string | null = null;

  @Input()
  public user: User | null = null;

  @Input()
  public job: Job | null = null;

  public meetForm !: FormGroup;

  public verificationBody: string = "Dear [Freelancer’s Name],\n" +
    "\n" +
    "I hope this message finds you well.\n" +
    "\n" +
    "As part of our commitment to maintaining a trusted and secure platform, we need to conduct a verification meeting to confirm the details of your profile. This process helps us ensure the accuracy of the information provided and enhance the credibility of our freelancer community.\n" +
    "\n" +
    "[This part will be generated based on Contact Type]" + "\n\n" +
    "Thank you for your cooperation. We look forward to verifying your profile and continuing to support your success on our platform.\n" +
    "\n" + "Best regards,\n\n" +
    "Pulse digital company";

  public interviewBody: string = "Dear [Freelancer’s Name],\n" +
    "\n" +
    "I hope this message finds you well.\n" +
    "\n" +
    "We are pleased to inform you that you have been shortlisted for an interview for the job '[Job Title]' posted by one of our esteemed clients. As part of our hiring process, we would like to invite you to an interview meeting to discuss your qualifications and experience further. This meeting will give us an opportunity to learn more about you and for you to learn more about the exciting opportunities offered by our client.\n" +
    "\n" +
    "[This part will be generated based on Contact Type]" + "\n\n" +
    "Thank you for your interest in this opportunity. We look forward to speaking with you and discussing how your skills and experiences align with the needs of our client.\n" +
    "\n" + "Best regards,\n\n" +
    "Pulse digital company";

  public body !: string;

  public videoCallMessage: string = "Please join the meeting using the following Google Meet link [link will be generated].";
  public phoneCallMessage: string = "You will be receiving a phone call from our administrative team shortly to discuss the verification details. Please ensure that you are available to take the call.";

  public oldGeneratedType: string = "[This part will be generated based on Contact Type]";
  public oldGeneratedLink: string = "[link will be generated]";

  private helper: Helper = inject(Helper);
  private errorSuccessSubscription !: Subscription;
  public errorSuccessState : ErrorSuccessState = {};

  public ngOnInit(): void {

    if (this.type == 'VERIFICATION')
      this.body = this.verificationBody;
    else {
      if (this.type == 'ADMIN_INTERVIEW')
        this.body = this.interviewBody;
    }

    if (this.user) {
      this.meetForm = this.formBuilder.group({
        date: this.formBuilder.control(null, [Validators.required]),
        meetType: this.formBuilder.control(this.type, [Validators.required]),
        contactType: this.formBuilder.control(this.type == 'ADMIN_INTERVIEW' ? 'VIDEO_CALL' : '', [Validators.required]),
        firstBody: this.formBuilder.control(this.body = this.body.replace("[Freelancer’s Name]", this.user.firstName + " " + this.user.lastName)),
        secondBody: this.formBuilder.control(null),
        resource: this.formBuilder.control(null),
      });


      if (this.type == 'VERIFICATION') {
        this.meetForm.addControl('title',
          this.formBuilder.control('Verification meet with ' + this.user.firstName + ' ' + this.user.lastName)
        );
      }

      if (this.type == 'ADMIN_INTERVIEW') {
        if (this.job) {
          this.meetForm.addControl('title',
            this.formBuilder.control('Interview meet with ' + this.user.firstName + ' ' + this.user.lastName + ' - ' + this.job.title + " job offer")
          );
          this.body = this.body.replace('[Job Title]', this.job?.title);
          this.meetForm.get('firstBody')?.setValue(this.body);

          this.handleOnChangeContactType();
        }
      }
    }

    this.errorSuccessSubscription = this.helper.subscribeToErrorSuccessState(this.errorSuccessState);
  }

  public handleCloseProgramMeet(): void {
    this.eventService.dispatchEvent({eventType: EventType.CLOSE_ADD_MEET});
  }

  public handleProgramMeet(): void {
    if (this.meetForm.invalid)
      alert("Please verify your fields!");
    else {
      let meet: Meet = this.meetForm.value;
      meet.receivers = [];
      if (meet.meetType == 'VERIFICATION')
        meet.receivers.push(this.user?.id);
      if (meet.meetType == 'ADMIN_INTERVIEW') {
        meet.jobId = this.job?.id;
        meet.receivers.push(this.user?.id);
      }
      this.eventService.dispatchEvent({eventType: EventType.PROGRAM_MEET, payload: meet});
    }
  }

  public handleOnChangeContactType(): void {

    if (this.meetForm.value.contactType == 'VIDEO_CALL') {
      this.body = this.body.replace(this.oldGeneratedType, this.videoCallMessage);
      this.oldGeneratedType = this.videoCallMessage;
    }

    if (this.meetForm.value.contactType == 'PHONE_CALL') {
      this.body = this.body.replace(this.oldGeneratedType, this.phoneCallMessage);
      this.oldGeneratedType = this.phoneCallMessage;
    }

    this.meetForm.get("firstBody")?.setValue(this.body);
  }

  public handleOnChangeLink(): void {
    this.body = this.body.replace(this.oldGeneratedLink, this.meetForm.value.resource);
    this.oldGeneratedLink = this.meetForm.value.resource;
    this.meetForm.get("firstBody")?.setValue(this.body);
  }

  public ngOnDestroy(): void {
    if(this.errorSuccessSubscription)
      this.errorSuccessSubscription.unsubscribe();
  }
}
