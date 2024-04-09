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
import { DataService } from './data.service';
import { AppControlService } from './app-control.service';

declare var TsSdk: any;

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private dataService: DataService,
    private appControlService: AppControlService
  ) {}
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
        this.actionOnUnauthorization();
        resolve(false);
        return;
      }

      TsSdk.authorizeUser(token)
        .then((response: any) => {
          if (response.data.length) {
            this.dataService.userObj = response.data[0];
            this.appControlService.validateOnboarding();
            TsSdk.getAllBoards();
            TsSdk.getAllInvolvedTeams({
              allTeams: this.dataService.userObj.teams
                ? this.dataService.userObj.teams
                : [],
            });
            TsSdk.getOverallJiraStats(this.dataService.userObj.jira.email);
            TsSdk.getJiraProjectKeyMapper();
            TsSdk.getAllNotifications();
            resolve(true);
          } else {
            this.actionOnUnauthorization();
            resolve(false);
            return;
          }
        })
        .catch((error: any) => {
          console.log(error);
          this.actionOnUnauthorization();
          resolve(false);
          return;
        });
    });
  }

  actionOnUnauthorization(): void {
    try {
      this.cookieService.delete('jwt');
      this.router.navigate(['/auth']);
    } catch (error) {
      console.error(error);
    }
  }
}
