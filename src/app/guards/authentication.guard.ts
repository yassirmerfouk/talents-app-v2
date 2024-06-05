import {CanActivateFn, Router} from '@angular/router';
import {AuthStateService} from "../services/auth.state.service";
import {inject} from "@angular/core";

export const authenticationGuard: CanActivateFn = (route, state) => {
  let authStateService : AuthStateService = inject(AuthStateService);
  let router : Router = inject(Router);
  if(!authStateService.authState.isAuthenticated){
    router.navigateByUrl('/auth/login');
    return false;
  }
  return true;
};
