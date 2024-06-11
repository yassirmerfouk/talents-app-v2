import {Component, inject, Input, OnInit} from '@angular/core';
import {EventService} from "../../../../../services/event.service";
import {EventType} from "../../../../../state/event-type.enum";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit-skills',
  templateUrl: './edit-skills.component.html',
  styleUrl: './edit-skills.component.css'
})
export class EditSkillsComponent implements OnInit{

  private eventService : EventService = inject(EventService);

  private formBuilder : FormBuilder = inject(FormBuilder);

  public skillsForm !: FormGroup;

  @Input()
  public skills : Array<string> | null = null;

  public ngOnInit() {
    if(this.skills)
      this.skillsForm = this.formBuilder.group({
        skills : this.formBuilder.control(this.skills.join(" "))
      });
  }

  public handleCloseUpdateSkills() : void {
    this.eventService.dispatchEvent({eventType : EventType.CLOSE_EDIT_SKILLS});
  }

  public handleUpdateSkills() : void {
    let skills : Array<string>;
    if(this.skillsForm.value.skills)
      skills = this.skillsForm.value.skills.split(" ");
    else
      skills = [];
    this.eventService.dispatchEvent({eventType : EventType.UPDATE_SKILLS, payload : skills});
  }
}
