import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { mergeMap } from 'rxjs/operators';
import { BASE_ROUTE } from '../constants/routes.constants';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  private readonly baseUrl = BASE_ROUTE; // Replace with your specified base URL

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith(this.baseUrl) && !req.url.includes('/signup')) {
      return from(this.authService.getJwtToken()).pipe(
        mergeMap(token => {
          if (token) {
            const modifiedRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            });
            return next.handle(modifiedRequest);
          } else {
            return next.handle(req);
          }
        })
      );
    } else if (req.url.includes('/signup')) {
      // Exclude interceptor logic for the signup request
      return next.handle(req);
    } else {
      return next.handle(req);
    }
  }
}
