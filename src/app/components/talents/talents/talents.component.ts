import {Component, inject, OnInit} from '@angular/core';
import {TalentService} from "../../../services/talent.service";
import {Page} from "../../../models/page.model";
import {Talent} from "../../../models/talent.model";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-talents',
  templateUrl: './talents.component.html',
  styleUrl: './talents.component.css'
})
export class TalentsComponent implements OnInit{

  private talentService : TalentService = inject(TalentService);

  public talentsPage !:  Page<Talent>;

  private page : number = 0;
  private size : number = 10;

  public ngOnInit() : void {
    this.getTalents();
  }

  public getTalents() : void {
    this.talentService.getTalents("VERIFIED", this.page, this.size).subscribe({
      next : (talentsPage : Page<Talent>) => {
        this.talentsPage = talentsPage;
        console.log(this.talentsPage);
      },
      error : (error : HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  public handleChangePage(page: number): void {
    this.page = page;
    this.getTalents();
  }

  public handlePreviousPage(): void {
    this.page--;
    this.getTalents();
  }

  public handleNextPage(): void {
    this.page++;
    this.getTalents();
  }
}
