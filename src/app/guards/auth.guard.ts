import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService, private alertCtrl: AlertController) { }
/**
 *
 * @param route
 *
 * first commit 
 * @returns
 */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.auth.user.pipe(
      take(1),
      map(user => {
        if (!user) {
          this.alertCtrl.create({
            header: 'Unauthorized',
            message: 'You are not allowed to access that page.',
            buttons: ['OK']
          }).then(alert => alert.present());

          this.router.navigateByUrl('/');
          return false;
        } else {
          return true;
        }
      })
    )

  }
}
