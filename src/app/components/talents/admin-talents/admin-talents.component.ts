import {Component, inject, OnInit} from '@angular/core';
import {TalentService} from "../../../services/talent.service";
import {Page} from "../../../models/page.model";
import {Talent} from "../../../models/talent.model";
import {HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Client} from "../../../models/client.model";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-talents',
  templateUrl: './admin-talents.component.html',
  styleUrl: './admin-talents.component.css'
})
export class AdminTalentsComponent implements OnInit{


  private talentService : TalentService = inject(TalentService);
  private userService : UserService = inject(UserService);

  private formBuilder: FormBuilder = inject(FormBuilder);
  private router : Router = inject(Router);

  public talentsPage !: Page<Talent>;

  private page : number = 0;
  private size : number = 10;
  private status : string = "all";

  public filterForm !: FormGroup;

  public ngOnInit() : void {
    this.getTalents();

    this.filterForm = this.formBuilder.group({
      status: this.formBuilder.control("all"),
    });
  }

  public getTalents() : void {
    this.talentService.getTalents(this.status, this.page, this.size).subscribe({
      next : (talentsPage : Page<Talent>) => {
        this.talentsPage = talentsPage;
      },
      error : (error : HttpErrorResponse) => console.log(error)
    });
  }

  public handleChangeStatus() : void {
    this.status = this.filterForm.value.status;
    this.page = 0;
    this.getTalents();
  }

  public handleDisplayTalent(id : number) : void {
    this.router.navigateByUrl(`talent/${id}`);
  }

  public handleVerifyUser(id : number) : void {
    this.userService.verifyUser(id).subscribe({
      next : () => {
        this.talentsPage.content = this.talentsPage.content.map((tal : Talent) => {
          if(tal.id == id) tal.status = 'VERIFIED'; return tal;
        })
      },
      error : (error : HttpErrorResponse) => console.log(error)
    });
  }

  public handleBanUser(id : number) : void {
    this.userService.banUser(id).subscribe({
      next : () => {
        this.talentsPage.content = this.talentsPage.content.map((tal : Talent) => {
          if(tal.id == id) tal.status = "BANNED"; return tal;
        });
      },
      error : (error : HttpErrorResponse) => console.log(error)
    });
  }

  public handlePermitUser(id : number) : void {
    this.userService.banUser(id).subscribe({
      next : () => {
        this.talentsPage.content = this.talentsPage.content.map((talent : Talent) => {
          if(talent.id == id) talent.status = 'NOT_VERIFIED'; return talent;
        });
      },
      error : (error : HttpErrorResponse) => console.log(error)
    });
  }

  public handleChangePage(page : number) : void {
    this.page = page;
    this.getTalents();
  }

  public handlePreviousPage() : void {
    this.page--;
    this.getTalents();
  }

  public handleNextPage() : void{
    this.page++;
    this.getTalents();
  }
}
