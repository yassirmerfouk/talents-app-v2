import {Component, inject, OnInit} from '@angular/core';
import {TalentService} from "../../../services/talent.service";
import {ActivatedRoute} from "@angular/router";
import {Talent} from "../../../models/talent.model";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-talent',
  templateUrl: './talent.component.html',
  styleUrl: './talent.component.css'
})
export class TalentComponent implements OnInit {

  private talentService: TalentService = inject(TalentService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  private id !: number;
  public talent !: Talent;

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: any) => this.id = params['id']
    );
    if (this.id)
      this.talentService.getTalent(this.id).subscribe({
        next: (talent: Talent) => {
          this.talent = talent;
          this.reverseTalent();
        },
        error: (error: HttpErrorResponse) => console.log(error)
      });
  }

  public reverseTalent(): void {
    this.talent.experiences = this.talent.experiences.reverse();
    this.talent.educations = this.talent.educations.reverse();
    this.talent.projects = this.talent.projects.reverse();
  }

}
