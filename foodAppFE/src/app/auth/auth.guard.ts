import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isLoggedIn().pipe(
      take(1), // Take 1 to complete the observable immediately
      map(isLoggedIn => {
        console.log(isLoggedIn);
        if (!isLoggedIn) {
          // Redirect to landing page if not logged in
          return this.router.createUrlTree(['/landing']);
        }
        // Allow the navigation if logged in
        return true;
      })
    );
  }
}
