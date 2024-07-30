import {Component, inject, OnInit} from '@angular/core';
import {Page} from "../../../models/page.model";
import {NotificationService} from "../../../services/notification.service";
import {Helper} from "../../../helper/helper";
import {HttpErrorResponse} from "@angular/common/http";
import {Notification} from "../../../models/notification.model";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {

  private notificationService: NotificationService = inject(NotificationService);
  private helper: Helper = inject(Helper);

  public notificationsPage !: Page<Notification>;

  public page: number = 0;
  public size: number = 10;

  public ngOnInit(): void {

    this.getNotifications();

    this.notificationService.notificationObservable.subscribe(
      (notification: Notification) => {
        if (this.page == 0)
          this.notificationsPage.content.unshift(notification);
      }
    );
  }

  public getNotifications(): void {
    this.notificationService.getUserNotificationsByPage(this.page, this.size).subscribe({
      next: (notificationPage: Page<Notification>) => {
        this.notificationsPage = notificationPage;
      },
      error: (error: HttpErrorResponse) => {
        this.helper.setErrorInState(error);
      }
    });
  }

  public handleOnClickNotification(notification: Notification): void {
    this.notificationService.clickOnNotification(notification.id).subscribe({
      next: () => {
        notification.clicked = true;
        this.notificationService.notifications = this.notificationService.notifications.map(
          notificationL => {
            if (notificationL.id == notification.id) notificationL.clicked = true;
            return notification;
          }
        );
        this.helper.navigateToNotificationPage(notification);
      }
    });
  }

  public handleOnDeleteNotification(notification: Notification): void {
    if (confirm("Are you sure to delete this notification?"))
      this.notificationService.deleteNotification(notification.id).subscribe({
        next: () => {
          this.notificationsPage.content = this.notificationsPage.content.filter(
            notificationL => notificationL.id != notification.id
          );
          this.notificationService.notifications = this.notificationService.notifications.filter(
            notificationL => notificationL.id != notification.id
          );
          this.helper.setSuccessMessageInState("Notification has been deleted with success.");
        },
        error: (error: HttpErrorResponse) => {
          this.helper.setErrorInState(error);
        }
      });
  }

  public handleChangePage(page: number): void {
    this.page = page;
    this.getNotifications();
  }

  public handlePreviousPage(): void {
    this.page--;
    this.getNotifications();
  }

  public handleNextPage(): void {
    this.page++;
    this.getNotifications();
  }
}
