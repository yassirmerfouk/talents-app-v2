import {inject, Injectable} from "@angular/core";
import {NgToastService} from "ng-angular-popup";
import {ErrorSuccessState} from "../state/states.model";
import {Store} from "../state/store.service";
import {Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Notification} from "../models/notification.model";
import {Router} from "@angular/router";
import {AuthStateService} from "../services/auth.state.service";

@Injectable({
  providedIn: 'root'
})
export class Helper {

  private store: Store = inject(Store);

  private toast: NgToastService = inject(NgToastService);

  private router: Router = inject(Router);

  private authStateService : AuthStateService = inject(AuthStateService);

  public getMonth(monthNumber: number): string | undefined {
    let month: string = "";
    switch (monthNumber) {
      case 1 :
        month = "January";
        break;
      case 2 :
        month = "February";
        break;
      case 3 :
        month = "March";
        break;
      case 4 :
        month = "April";
        break;
      case 5 :
        month = "May";
        break;
      case 6 :
        month = "June";
        break;
      case 7 :
        month = "July";
        break;
      case 8 :
        month = "August";
        break;
      case 9 :
        month = "September";
        break;
      case 10 :
        month = "October";
        break;
      case 11 :
        month = "November";
        break;
      case 12 :
        month = "December";
        break;
    }
    return month;
  }

  private handleErrorSuccessInComponent(state: any, errorSuccessState: ErrorSuccessState): void {
    errorSuccessState.error = state.error;
    errorSuccessState.errors = state.errors ? new Map(Object.entries(state.errors)) : new Map;
    errorSuccessState.successMessage = state.successMessage;
    /*if (errorSuccessState?.error)
      this.toast.danger(errorSuccessState?.error, "", 5000);
    if (errorSuccessState?.successMessage)
      this.toast.success(errorSuccessState?.successMessage, "", 5000);*/
  }

  public subscribeToErrorSuccessState(errorSuccessState: ErrorSuccessState): Subscription {
    return this.store.errorSuccessState$.subscribe(
      (state: any) => {
        this.handleErrorSuccessInComponent(state, errorSuccessState);
      }
    );
  }

  public clearErrorSuccessState(): void {
    this.store.clearErrorSuccessState();
  }

  public setErrorInState(error: HttpErrorResponse): void {
    this.store.setErrorSuccessState({
      errors: error.error?.errors,
      error: error.error?.message
    });
    if (error.error.message)
      this.toast.danger(error.error.message, "", 5000);
  }

  public setSuccessMessageInState(successMessage: string): void {
    this.store.setErrorSuccessState({
      successMessage: successMessage
    });
    this.toast.success(successMessage, "", 5000);
  }

  public navigateToNotificationPage(notification: Notification): void {
    if (notification.type == 'JOB_STATUS_CHANGED')
      this.router.navigateByUrl('/job/' + notification.relatedModel);
    if (notification.type == 'MEET')
      this.router.navigateByUrl('/meets');
    if (notification.type == 'TALENT_VERIFICATION') {
      if (this.authStateService.hasAuthority('ADMIN'))
        this.router.navigateByUrl('/admin/talents');
      else
        this.router.navigateByUrl('/talent/my-profile');
    }
    if (notification.type == 'CLIENT_VERIFICATION') {
      if (this.authStateService.hasAuthority('ADMIN'))
        this.router.navigateByUrl('/admin/clients');
      else
        this.router.navigateByUrl('/client/my-profile');
    }
  }

  public displayFieldErrorMessage(key: string, errorSuccessState: ErrorSuccessState): HTMLDivElement {
    const div: HTMLDivElement = document.createElement('div');
    if (errorSuccessState.errors?.has(key)) {
      div.className = "text-danger mt-2 small";
      div.textContent = <string>errorSuccessState.errors?.get(key);
    }
    return div;
  }
}
