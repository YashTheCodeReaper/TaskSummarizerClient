import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

declare var TsSdk: any;

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return new Promise<boolean>((resolve, reject) => {
      const token = this.cookieService.get('jwt');
      if (!token) {
        this.cookieService.delete('jwt');
        this.router.navigate(['/auth']);
        resolve(false);
        return;
      }

      TsSdk.authorizeUser(token)
        .then((response: any) => {
          if (response.data.length) resolve(true);
        })
        .catch((error: any) => {
          console.log(error);
          this.cookieService.delete('jwt');
          this.router.navigate(['/auth']);
          resolve(false);
          return;
        });
    });
  }
}
