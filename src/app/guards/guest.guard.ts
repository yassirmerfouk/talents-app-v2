import {CanActivateFn, Router} from '@angular/router';
import {AuthStateService} from "../services/auth.state.service";
import {inject} from "@angular/core";

export const guestGuard: CanActivateFn = (route, state) => {
  let authStateService : AuthStateService = inject(AuthStateService);
  let router : Router = inject(Router);
  if(authStateService.authState.isAuthenticated){
    if(authStateService.authState.authorities?.includes('TALENT'))
      router.navigateByUrl("/talent/my-profile");
    if(authStateService.authState.authorities?.includes('CLIENT'))
      router.navigateByUrl("/client/my-profile");
    if(authStateService.authState.authorities?.includes('ADMIN'))
      router.navigateByUrl("/admin/talents");
  }
  return true;
};
