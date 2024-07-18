import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache: Map<string, any> = new Map();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      return next.handle(req); 
    }

    const cachedResponse = this.cache.get(req.url);
    if (cachedResponse) {
      console.log(`Cached response for URL: ${req.url}`);
      return of(new HttpResponse({ body: cachedResponse })); 
    }

    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          console.log(`Fetched response for URL: ${req.url}`);
          this.cache.set(req.url, event.body); 
        }
      })
    );
  }

  clearCache(): void {
    this.cache.clear();
    console.log('Cache cleared');
  }
}
