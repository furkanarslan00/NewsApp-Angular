import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  private apiKey = environment.newsApiKey;
  private apiUrl = 'https://newsapi.org/v2';

  constructor(private http: HttpClient, private router: Router) {}

  getRecentNews(page: number = 1): Observable<any> {
    const url = `${this.apiUrl}/everything?q=news&sortBy=publishedAt&apiKey=${this.apiKey}&page=${page}&pageSize=5`;
    return this.http.get<any>(url);
  }
  
  getPopularPosts(page: number = 1): Observable<any> {
    const url = `${this.apiUrl}/everything?q=popularity&apiKey=${this.apiKey}&page=${page}&pageSize=5`;
    return this.http.get<any>(url);
  }

  getEditorPicks(page: number = 1): Observable<any> {
    const url = `${this.apiUrl}/everything?q=turkey&apiKey=${this.apiKey}&page=${page}&pageSize=5`;
    return this.http.get<any>(url);
  }

  getTrendingPosts(page: number = 1): Observable<any> {
    const url = `${this.apiUrl}/everything?q=bitcoin&apiKey=${this.apiKey}&page=${page}&pageSize=5`;
    return this.http.get<any>(url);
  }

  searchNews(query: string, page: number = 1): Observable<any> {
    const url = `${this.apiUrl}/everything?q=${query}&apiKey=${this.apiKey}&page=${page}&pageSize=5`;
    return this.http.get<any>(url);
  }

  getTopHeadlines(country: string = 'us', category: string = 'general', page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}/top-headlines?country=${country}&category=${category}&apiKey=${this.apiKey}&page=${page}&pageSize=5`);
  }

  getTrendingCategory(category: string = 'general', page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/everything?q=${category}&sortBy=trending&apiKey=${this.apiKey}&page=${page}&pageSize=5`);
  }


}
