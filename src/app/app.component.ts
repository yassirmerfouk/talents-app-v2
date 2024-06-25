import {Component, inject, OnInit, Renderer2} from '@angular/core';
import {AuthStateService} from "./services/auth.state.service";
import {Router} from "@angular/router";
import {EventService} from "./services/event.service";
import {ActionEvent} from "./state/action-event.event";
import {EventType} from "./state/event-type.enum";
import {Reducer} from "./state/reducer.service";
import {Store} from "./state/store.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'talents-app';

  public authStateService: AuthStateService = inject(AuthStateService);

  private router: Router = inject(Router);

  private renderer: Renderer2 = inject(Renderer2);

  public changeStyle: boolean = false;

  private body !: any;

  private store : Store = inject(Store);
  private reducer : Reducer = inject(Reducer);


  public ngOnInit(): void {
    let accessToken = this.authStateService.getTokenFromLocalStorage();
    if (accessToken)
      if(!this.authStateService.loadUser(accessToken))
        this.authStateService.removeTokenFromLocalStorage();

    this.body = this.renderer.selectRootElement('body', true);

    this.reducer.dispatcher$.subscribe(
      ($event: ActionEvent) => {
        if ($event.eventType.startsWith('OPEN')) {
          this.changeStyle = true;
          this.renderer.setStyle(this.body, 'overflow', 'hidden');
          this.renderer.setStyle(this.body, 'padding-right', '17px');
        }

        if ($event.eventType.startsWith('CLOSE')){
          this.changeStyle = false;
          this.renderer.removeStyle(this.body, 'overflow');
          this.renderer.removeStyle(this.body, 'padding-right');
        }
      }
    );

  }

  public handleLogout(): void {
    this.authStateService.unloadUser();
    this.authStateService.removeTokenFromLocalStorage();
    this.store.clearState();
    this.router.navigateByUrl('auth/login');
  }
}
