import {Component, inject, OnInit} from '@angular/core';
import {SkillService} from "../../../services/skill.service";
import {Page} from "../../../models/page.model";
import {Skill} from "../../../models/skill.model";
import {Helper} from "../../../helper/helper";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorSuccessState} from "../../../state/states.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-admin-skills',
  templateUrl: './admin-skills.component.html',
  styleUrl: './admin-skills.component.css'
})
export class AdminSkillsComponent implements OnInit {

  private formBuilder: FormBuilder = inject(FormBuilder);

  private skillService: SkillService = inject(SkillService);

  private helper: Helper = inject(Helper);

  public skillsPage !: Page<Skill>;

  private page: number = 0;
  private size: number = 10;

  public errorSuccessState: ErrorSuccessState = {};

  public addSkillForm !: FormGroup;
  public updateSkillForm !: FormGroup;

  public showUpdateForm: boolean = false;

  public ngOnInit(): void {

    this.addSkillForm = this.formBuilder.group({
      title: this.formBuilder.control(null, [Validators.required])
    });

    this.updateSkillForm = this.formBuilder.group({
      id: this.formBuilder.control(null),
      title: this.formBuilder.control(null, [Validators.required])
    });

    this.getSkills();
  }

  public getSkills(): void {
    this.skillService.getSkillsByPage(this.page, this.size).subscribe({
      next: (skillsPage: Page<Skill>) => {
        this.skillsPage = skillsPage;
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public handleAddSkill(): void {
    let skill: Skill = this.addSkillForm.value;
    skill.title = skill.title.toUpperCase();
    this.skillService.addSkill(skill).subscribe({
      next: (skill: Skill) => {
        this.skillsPage.content.unshift(skill);
        this.helper.setSuccessMessageInState("New skill has been added to the list.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public handleOpenUpdate(skill: Skill): void {
    this.showUpdateForm = true;
    this.updateSkillForm.get('id')?.setValue(skill.id);
    this.updateSkillForm.get('title')?.setValue(skill.title);
  }

  public handleCloseUpdate(): void {
    this.showUpdateForm = false;
  }

  public handleUpdateSkill(): void {
    let skill: Skill = this.updateSkillForm.value;
    this.skillService.updateSkill(skill).subscribe({
      next: (skill: Skill) => {
        this.skillsPage.content = this.skillsPage.content.map(skillL => {
          if (skillL.id == skill.id) skillL = skill;
          return skillL;
        });
        this.helper.setSuccessMessageInState("Skill has been updated with success.");
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public handleDeleteSkill(skill: Skill): void {
    if (confirm("Are you sure to delete this skill?"))
      this.skillService.deleteSkill(skill.id).subscribe({
        next: () => {
          this.skillsPage.content = this.skillsPage.content.filter(skillL => skillL.id != skill.id);
          this.helper.setSuccessMessageInState("Skill has been deleted with success.");
        },
        error: (error: HttpErrorResponse) => {
          this.helper.setErrorInState(error);
        }
      })
  }

  public handleChangePage(page: number): void {
    this.page = page;
    this.getSkills();
  }

  public handlePreviousPage(): void {
    this.page--;
    this.getSkills();
  }

  public handleNextPage(): void {
    this.page++;
    this.getSkills();
  }
}
