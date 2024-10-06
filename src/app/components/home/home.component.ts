import {Component, inject, OnInit} from '@angular/core';
import {AuthStateService} from "../../services/auth.state.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  private authStateService: AuthStateService = inject(AuthStateService);
  private router: Router = inject(Router);

  public ngOnInit(): void {
    if (!this.authStateService.authState.isAuthenticated)
      this.router.navigateByUrl("/auth/login");
    else {
      if (this.authStateService.hasAuthority('ADMIN'))
        this.router.navigateByUrl("/admin/dashboard");
      else if (this.authStateService.hasAuthority('TALENT'))
        this.router.navigateByUrl("/jobs");
      else
        this.router.navigateByUrl("/client/my-jobs");
    }
  }
}
