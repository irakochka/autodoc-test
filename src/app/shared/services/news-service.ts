import {HttpClient } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {BASE_API_URL, News, Pageable} from '@shared';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  http = inject(HttpClient);
  baseApiUrl = inject(BASE_API_URL);

  fetchAllNews(page: number, limit: number): Observable<Pageable<News[]>> {
    return this.http.get<Pageable<News[]>>(`${this.baseApiUrl}/news/${page}/${limit}`);
  }

  fetchNewsDetails(category: string, slug: string): Observable<News> {
    return this.http.get<News>(`${this.baseApiUrl}/news/item/${category}/${slug}`);
  }
}
