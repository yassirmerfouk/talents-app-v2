import {inject, Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthStateService} from "../services/auth.state.service";

@Injectable()
export class httpInterceptor implements HttpInterceptor {

  private authStateService : AuthStateService = inject(AuthStateService);


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authState = this.authStateService.authState;
    if(authState.isAuthenticated){
      let newRequest  = request.clone(
        {
          headers : request.headers.set("Authorization", "Bearer " + authState.accessToken)
        }
      );
      return next.handle(newRequest);
    }
    return next.handle(request);
  }
}
