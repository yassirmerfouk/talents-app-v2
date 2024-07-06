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
  public skills !: Array<string>;

  public skillsList : Array<string> = [];

  public ngOnInit() {
    if(this.skills){
      this.skillsList = this.skills.map(skill => skill);
      this.skillsForm = this.formBuilder.group({
        skill : this.formBuilder.control("")
      });
    }
  }

  public handleCloseUpdateSkills() : void {
    this.eventService.dispatchEvent({eventType : EventType.CLOSE_EDIT_SKILLS});
  }

  public handleAddSkill(): void {
    let skill: string = this.skillsForm.value.skill;
    skill = skill.toUpperCase();
    if (!this.skillsList?.includes(skill))
      this.skillsList?.push(skill);
    this.skillsForm.get('skill')?.setValue(null);
  }

  public handleDeleteSkill(skill : string) : void {
    this.skillsList = this.skillsList?.filter(x => x != skill);
  }

  public handleUpdateSkills() : void {
    this.eventService.dispatchEvent({eventType : EventType.UPDATE_SKILLS, payload : this.skillsList});
  }
}
