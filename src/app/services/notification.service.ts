import {inject, Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import {AuthStateService} from "./auth.state.service";
import {NgToastService} from "ng-angular-popup";
import {Notification} from "../models/notification.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private authStateService: AuthStateService = inject(AuthStateService);

  private socketUrl: string = `${environment.api}/websocket`;

  private specificNotificationBroker: string = "/topic/notifications/specific-";

  public socket !: WebSocket;
  public stompClient !: Stomp.Client;

  private toast: NgToastService = inject(NgToastService);

  private httpClient : HttpClient = inject(HttpClient);
  private api : string = `${environment.api}/notifications`;

  public constructor() {
  }


  public stompConnection(): void {
    this.socket = new SockJS(this.socketUrl);
    this.stompClient = Stomp.over(this.socket);
  }

  public specificNotificationsSubscription(): void {
      this.stompClient.connect({}, () => {
        this.stompClient.subscribe(this.specificNotificationBroker + this.authStateService.authState.id, (result) => {
          let notification: Notification = JSON.parse(result.body);
          this.toast.info(notification.body);
        });
      });
  }

  public specificNotificationUnsubscription() : void {
    this.stompClient.disconnect(() => {});
  }

  public getUserUnreadNotification() : Observable<Array<Notification>>{
    return this.httpClient.get<Array<Notification>>(`${this.api}`);
  }

}
