import {Component, inject, OnInit} from '@angular/core';
import {ClientService} from "../../../services/client.service";
import {Page} from "../../../models/page.model";
import {Client} from "../../../models/client.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-admin-clients',
  templateUrl: './admin-clients.component.html',
  styleUrl: './admin-clients.component.css'
})
export class AdminClientsComponent implements OnInit {

  private clientService : ClientService = inject(ClientService);
  private userService : UserService = inject(UserService);

  private formBuilder: FormBuilder = inject(FormBuilder);

  public clientsPage !: Page<Client>;

  public status: string = "all";
  public page: number = 0;
  public size: number = 10;

  public filterForm !: FormGroup;

  public ngOnInit(): void {
    this.getClients();

    this.filterForm = this.formBuilder.group({
      status: this.formBuilder.control("all"),
    });
  }

  public getClients() : void {
    this.clientService.getClients(this.status,this.page,this.size).subscribe({
      next : (clientsPage : Page<Client>) => {
        this.clientsPage = clientsPage;
      }
    });
  }

  public handleChangeStatus() : void {
    this.status = this.filterForm.value.status;
    this.page = 0;
    this.getClients();
  }

  public handleVerifyUser(id : number) : void {
    this.userService.verifyUser(id).subscribe({
      next : () => {
        this.clientsPage.content = this.clientsPage.content.map((cli : Client) => {
          if(cli.id == id) cli.status = 'VERIFIED'; return cli;
        });
      },
      error : (error : HttpErrorResponse) => console.log(error)
    });
  }

  public handleBanUser(id : number) : void {
    this.userService.banUser(id).subscribe({
      next : () => {
        this.clientsPage.content = this.clientsPage.content.map((cli : Client) => {
          if(cli.id == id) cli.status = 'BANNED'; return cli;
        });
      },
      error : (error : HttpErrorResponse) => console.log(error)
    });
  }

  public handlePermitUser(id : number) : void {
    this.userService.banUser(id).subscribe({
      next : () => {
        this.clientsPage.content = this.clientsPage.content.map((cli : Client) => {
          if(cli.id == id) cli.status = 'NOT_VERIFIED'; return cli;
        });
      },
      error : (error : HttpErrorResponse) => console.log(error)
    });
  }

  public handleChangePage(page : number) : void {
    this.page = page;
    this.getClients();
  }

  public handlePreviousPage() : void {
    this.page--;
    this.getClients();
  }

  public handleNextPage() : void{
    this.page++;
    this.getClients();
  }

}
