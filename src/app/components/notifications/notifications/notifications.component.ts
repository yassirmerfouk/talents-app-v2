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
      }
    });
  }

  public handleChangePage(page: number): void {
    console.log(page);
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
