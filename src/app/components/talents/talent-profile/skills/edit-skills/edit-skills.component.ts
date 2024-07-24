import {Component, inject, Input, OnInit} from '@angular/core';
import {EventService} from "../../../../../services/event.service";
import {EventType} from "../../../../../state/event-type.enum";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SkillService} from "../../../../../services/skill.service";

@Component({
  selector: 'app-edit-skills',
  templateUrl: './edit-skills.component.html',
  styleUrl: './edit-skills.component.css'
})
export class EditSkillsComponent implements OnInit {

  private eventService: EventService = inject(EventService);
  private formBuilder: FormBuilder = inject(FormBuilder);

  private skillService: SkillService = inject(SkillService);

  public skillsForm !: FormGroup;

  @Input()
  public skills !: Array<string>;

  public skillsList: Array<string> = [];

  public existedSkills: Array<string> = [];

  public searchedSkills: Array<string> = [];

  public ngOnInit() {
    if (this.skills) {
      this.skillsList = this.skills.map(skill => skill);
      this.skillsForm = this.formBuilder.group({
        skill: this.formBuilder.control("")
      });

      this.skillService.getSkills().subscribe({
        next: (skills: Array<any>) => {
          this.existedSkills = skills.map(skill => skill.title);
        }
      });

      this.skillsForm.get('skill')?.valueChanges.subscribe((value: string) => {
        if (value)
          this.searchedSkills = this.existedSkills.filter(skill => skill.includes(value.toUpperCase()));
        else
          this.searchedSkills = [];
      })
    }
  }

  public handleCloseUpdateSkills(): void {
    this.eventService.dispatchEvent({eventType: EventType.CLOSE_EDIT_SKILLS});
  }

  public handleAddSkill(skill : string): void {
    skill = skill.toUpperCase();
    if (!this.skillsList?.includes(skill))
      this.skillsList?.push(skill);
  }

  public handleDeleteSkill(skill: string): void {
    this.skillsList = this.skillsList?.filter(x => x != skill);
  }

  public handleUpdateSkills(): void {
    this.eventService.dispatchEvent({eventType: EventType.UPDATE_SKILLS, payload: this.skillsList});
  }
}
