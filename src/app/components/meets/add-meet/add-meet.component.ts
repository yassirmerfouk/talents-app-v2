import {Component, inject, Input, OnInit} from '@angular/core';
import {User} from "../../../models/user.model";
import {EventService} from "../../../services/event.service";
import {EventType} from "../../../state/event-type.enum";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Meet} from "../../../models/meet.model";

@Component({
  selector: 'app-add-meet',
  templateUrl: './add-meet.component.html',
  styleUrl: './add-meet.component.css'
})
export class AddMeetComponent implements OnInit {

  private eventService: EventService = inject(EventService);

  private formBuilder: FormBuilder = inject(FormBuilder);

  @Input()
  public type: string | null = null;

  @Input()
  public user: User | null = null;

  public meetForm !: FormGroup;

  public body: string = "Dear [Freelancer’s Name],\n" +
    "\n" +
    "I hope this message finds you well.\n" +
    "\n" +
    "As part of our commitment to maintaining a trusted and secure platform, we need to conduct a verification meeting to confirm the details of your profile. This process helps us ensure the accuracy of the information provided and enhance the credibility of our freelancer community.\n" +
    "\n" +
    "Please join the meeting using the following Google Meet link [link will be generated].\n\n" +
    "Thank you for your cooperation. We look forward to verifying your profile and continuing to support your success on our platform.\n" +
    "\n" + "Best regards,\n\n" +
    "Pulse digital company";

  public ngOnInit(): void {
    if (this.user) {
      this.meetForm = this.formBuilder.group({
        title: this.formBuilder.control((this.type == "VERIFICATION" ? `Verification meet` : 'Interview meet') + ' with ' + this.user.firstName + ' ' + this.user.lastName, [Validators.required]),
        date: this.formBuilder.control(null, [Validators.required]),
        meetType: this.formBuilder.control(this.type, [Validators.required]),
        contactType: this.formBuilder.control("", [Validators.required]),
        resource : this.formBuilder.control(null),
        body: this.formBuilder.control(this.body.replace("[Freelancer’s Name]", this.user.firstName + " " + this.user.lastName))
      });
    }
  }

  public handleCloseProgramMeet(): void {
    this.eventService.dispatchEvent({eventType: EventType.CLOSE_ADD_MEET});
  }

  public handleProgramMeet() : void {
    if(this.meetForm.invalid)
      alert("Please verify your fields!");
    else{
      let meet : Meet = this.meetForm.value;
      meet.receiverId = this.user?.id;
      this.eventService.dispatchEvent({eventType : EventType.PROGRAM_MEET, payload : meet});
    }
  }

  public handleOnChangeLink() : void {
    let link = this.meetForm.value.resource;
    this.meetForm.get('body')?.setValue(this.meetForm.value.body.replace('[link will be generated]', link));
  }
}
