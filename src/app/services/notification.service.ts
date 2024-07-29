import {inject, Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import {AuthStateService} from "./auth.state.service";
import {NgToastService} from "ng-angular-popup";
import {Notification} from "../models/notification.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Page} from "../models/page.model";

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

  private httpClient: HttpClient = inject(HttpClient);
  private api: string = `${environment.api}/notifications`;

  public notifications: Array<Notification> = [];

  public stompConnection(): void {
    this.socket = new SockJS(this.socketUrl);
    this.stompClient = Stomp.over(this.socket);
  }

  public specificNotificationsSubscription(): void {
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(this.specificNotificationBroker + this.authStateService.authState.id, (result) => {
        let notification: Notification = JSON.parse(result.body);
        this.notifications.unshift(notification);
        this.toast.info(notification.body, "", 10000);
      });
    });
  }

  public specificNotificationUnsubscription(): void {
    if (this.stompClient)
      this.stompClient.disconnect(() => {
      });
  }

  public countUnseenNotifications(): number {
    return this.notifications.filter(notification => !notification.seen).length;
  }

  public getUserNotifications(): Observable<Array<Notification>> {
    return this.httpClient.get<Array<Notification>>(`${this.api}`);
  }

  public getUserNotificationsByPage(page: number, size: number): Observable<Page<Notification>> {
    return this.httpClient.get<Page<Notification>>(`${this.api}/page?page=${page}&size=${size}`);
  }

  public readUserNotifications(): Observable<any> {
    return this.httpClient.post<any>(`${this.api}/read`, {});
  }

  public clickOnNotification(id: number): Observable<any> {
    return this.httpClient.post<any>(`${this.api}/${id}/click`, {});
  }

  public deleteNotification(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.api}/${id}`);
  }


}
