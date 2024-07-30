import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {EventService} from "../../../services/event.service";
import {EventType} from "../../../state/event-type.enum";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Meet} from "../../../models/meet.model";
import {Helper} from "../../../helper/helper";
import {Subscription} from "rxjs";
import {ErrorSuccessState} from "../../../state/states.model";

@Component({
  selector: 'app-add-client-meet',
  templateUrl: './add-client-meet.component.html',
  styleUrl: './add-client-meet.component.css'
})
export class AddClientMeetComponent implements OnInit, OnDestroy {

  private eventService: EventService = inject(EventService);

  private formBuilder: FormBuilder = inject(FormBuilder);

  @Input()
  public programClientMeet: any;

  @Input()
  public type !: string;

  public clientMeetForm !: FormGroup;

  private talentMessage: string = "Dear [Freelancer’s Name],"

    + "\n\nWe hope this message finds you well."

    + "\n\nWe are pleased to inform you that you have been selected by our client to pass an interview for the job '[Job Title]'. As part of this process, we would like to invite you to an interview meeting to discuss your qualifications and experience further. This meeting will give us an opportunity to learn more about you and for you to learn more about the exciting opportunities offered by our client."

    + "\n\nPlease join the meeting using the following Google Meet link [link will be generated]."

    + "\n\nThank you for your interest in this opportunity. We look forward to speaking with you and discussing how your skills and experiences align with the needs of our client."

    + "\n\nBest regards,"

    + "\n\nPulse Digital Company";

  private clientMassage: string = "Dear [Client’s Name],"

    + "\n\nI hope this message finds you well."

    + "\n\nWe are pleased to inform you that we have arranged the interview you requested for the job '[Job Title]'. The interview meeting has been scheduled to discuss their qualifications and experience further."

    + "\n\nPlease join the meeting using the following Google Meet link [link will be generated]."

    + "\n\nThank you for your continued trust in our services. We look forward to facilitating this interview and helping you find the right fit for your needs."

    + "\n\nBest regards,"

    + "\n\n Pulse Digital Company;";

  private oldGeneratedLink: string = "[link will be generated]";

  private helper: Helper = inject(Helper);
  private errorSuccessSubscription !: Subscription;
  public errorSuccessState: ErrorSuccessState = {};

  public ngOnInit(): void {
    if (this.programClientMeet) {
      this.clientMeetForm = this.formBuilder.group({
        title: this.formBuilder.control(`Client ${this.programClientMeet.job.client.firstName} ${this.programClientMeet.job.client.lastName} meet with talent ${this.programClientMeet.application.talent.firstName} ${this.programClientMeet.application.talent.lastName} for job ${this.programClientMeet.job.title}`),
        date: this.formBuilder.control(this.programClientMeet.date, [Validators.required]),
        meetType: this.formBuilder.control(this.type, [Validators.required]),
        contactType: this.formBuilder.control('VIDEO_CALL', [Validators.required]),
        firstBody: this.formBuilder.control(this.talentMessage.replace('[Freelancer’s Name]', `${this.programClientMeet.application.talent.firstName} ${this.programClientMeet.application.talent.lastName}`).replace('[Job Title]', this.programClientMeet.job.title)),
        secondBody: this.formBuilder.control(this.clientMassage.replace('[Client’s Name]', `${this.programClientMeet.job.client.firstName} ${this.programClientMeet.job.client.lastName}`).replace('[Job Title]', this.programClientMeet.job.title)),
        resource: this.formBuilder.control(null),
      });
    }

    this.errorSuccessSubscription = this.helper.subscribeToErrorSuccessState(this.errorSuccessState);

  }

  public handleCloseProgramClientMeet(): void {
    this.eventService.dispatchEvent({eventType: EventType.CLOSE_ADD_CLIENT_MEET});
  }

  public handleProgramClientMeet(): void {
    let meet: Meet = this.clientMeetForm.value;
    meet.jobId = this.programClientMeet.job.id;
    meet.applicationId = this.programClientMeet.application.id;
    meet.receivers = [this.programClientMeet.job.client.id, this.programClientMeet.application.talent.id];
    meet.application = this.programClientMeet.application;
    this.eventService.dispatchEvent({eventType: EventType.PROGRAM_CLIENT_MEET, payload: meet});
  }

  public handleOnChangeLink(): void {
    this.replaceLinkInBody(this.clientMeetForm.value.resource);
  }

  public replaceLinkInBody(newLink: string): void {
    this.clientMeetForm.get('firstBody')?.setValue(this.clientMeetForm.value.firstBody.replace(this.oldGeneratedLink, newLink));
    this.clientMeetForm.get('secondBody')?.setValue(this.clientMeetForm.value.secondBody.replace(this.oldGeneratedLink, newLink));
    this.oldGeneratedLink = newLink;
  }

  public ngOnDestroy(): void {
    if (this.errorSuccessSubscription)
      this.errorSuccessSubscription.unsubscribe();
  }
}
