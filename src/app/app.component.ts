import {Component, inject, OnInit, Renderer2} from '@angular/core';
import {AuthStateService} from "./services/auth.state.service";
import {Router} from "@angular/router";
import {ActionEvent} from "./state/action-event.event";
import {Reducer} from "./state/reducer.service";
import {Store} from "./state/store.service";
import {EventType} from "./state/event-type.enum";
import {NotificationService} from "./services/notification.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Notification} from "./models/notification.model";

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

  private store: Store = inject(Store);
  private reducer: Reducer = inject(Reducer);

  private notificationService: NotificationService = inject(NotificationService);


  public ngOnInit(): void {

    let accessToken = this.authStateService.getTokenFromLocalStorage();
    let login : boolean = false;
    if (accessToken){
      login = this.authStateService.loadUser(accessToken)
      if (!login)
        this.authStateService.removeTokenFromLocalStorage();
    }

    this.body = this.renderer.selectRootElement('body', true);

    this.reducer.dispatcher$.subscribe(
      ($event: ActionEvent) => {
        if ($event.eventType.startsWith('OPEN')) {
          this.changeStyle = true;
          this.renderer.setStyle(this.body, 'overflow', 'hidden');
          this.renderer.setStyle(this.body, 'padding-right', '17px');
        }

        if ($event.eventType.startsWith('CLOSE')) {
          this.changeStyle = false;
          this.renderer.removeStyle(this.body, 'overflow');
          this.renderer.removeStyle(this.body, 'padding-right');
        }

        if ($event.eventType == EventType.CONNECT_TO_NOTIFICATION) {
          this.notificationService.stompConnection();
          this.notificationService.specificNotificationsSubscription();
          this.notificationService.getUserUnreadNotification().subscribe({
            next : (notifications : Array<Notification>)=> {
              console.log(notifications);
            },
            error : (error : HttpErrorResponse)=>{
              console.log(error);
            }
          });
        }


      }
    );

    if(login)
      this.reducer.dispatcherSubject.next({eventType : EventType.CONNECT_TO_NOTIFICATION});

  }

  public handleLogout(): void {
    this.authStateService.unloadUser();
    this.authStateService.removeTokenFromLocalStorage();
    this.store.clearState();
    /*    this.notificationService.specificNotificationUnsubscription();*/
    this.router.navigateByUrl('auth/login');
  }
}
