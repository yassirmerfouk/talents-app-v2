import {Component, inject, OnInit} from '@angular/core';
import {Client} from "../../../models/client.model";
import {ActivatedRoute} from "@angular/router";
import {ClientService} from "../../../services/client.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private clientService: ClientService = inject(ClientService);

  private id !: number;
  public client !: Client;

  public ngOnInit(): void {

    this.activatedRoute.params.subscribe(
      (params: any) => this.id = params['id']
    );
    if (this.id)
      this.clientService.getClient(this.id).subscribe({
        next: (client: Client) => {
          this.client = client;
          console.log(client)
        },
        error: (error: HttpErrorResponse) => console.log(error)
      });
  }
}
