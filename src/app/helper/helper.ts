import {inject, Injectable} from "@angular/core";
import {NgToastService} from "ng-angular-popup";
import {ErrorSuccessState} from "../state/states.model";
import {Store} from "../state/store.service";
import {Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class Helper {

  private store: Store = inject(Store);

  private toast: NgToastService = inject(NgToastService);

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
    errorSuccessState.error = state.errorSuccessState?.error;
    errorSuccessState.errors = state.errorSuccessState?.errors ? new Map(Object.entries(state.errorSuccessState.errors)) : new Map;
    errorSuccessState.successMessage = state.errorSuccessState?.successMessage;
    if (errorSuccessState?.error)
      this.toast.danger(errorSuccessState?.error, "", 5000);
    if (errorSuccessState?.successMessage)
      this.toast.success(errorSuccessState?.successMessage, "", 5000);
  }

  public subscribeToErrorSuccessState(errorSuccessState: ErrorSuccessState): Subscription {
    return this.store.state$.subscribe(
      (state: any) => {
        this.handleErrorSuccessInComponent(state, errorSuccessState);
      }
    );
  }

  public clearErrorSuccessState(): void {
    console.log("executed...");
    this.store.clearErrorSuccessState();
  }

  public setErrorInState(error: HttpErrorResponse): void {
    this.store.setState({
      errorSuccessState: {
        errors: error.error?.errors,
        error: error.error?.message
      }
    });
  }

  public setSuccessMessageInState(successMessage: string): void {
    this.store.setState({
      errorSuccessState: {
        successMessage: successMessage
      }
    });
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
