import {CanActivateFn, Router} from '@angular/router';
import {AuthStateService} from "../services/auth.state.service";
import {inject} from "@angular/core";

export const authorizationGuard: CanActivateFn = (route, state) => {
  let authStateService : AuthStateService = inject(AuthStateService);
  let router : Router = inject(Router);
  let role : string = route.data['role'];
  if(!authStateService.hasAuthority(role)){
    router.navigateByUrl('/');
    return false;
  }
  return true;
};
