import {inject, Injectable} from '@angular/core';
import {News} from '@shared/interfaces';
import {BehaviorSubject, catchError, EMPTY, finalize, map} from 'rxjs';
import {NewsService} from '@shared/services';

export interface NewsState {
  news: News[];
  nextPage: number;
  limit: number;
  loading: boolean;
  hasMore: boolean;
  totalCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class NewsStore {
  private readonly newsService = inject(NewsService);

  private readonly stateSubject = new BehaviorSubject<NewsState>({
    news: [],
    nextPage: 1,
    limit: 10,
    loading: false,
    hasMore: true,
    totalCount: 0,
  });

  readonly state$ = this.stateSubject.asObservable();

  get snapshot(): NewsState {
    return this.stateSubject.value;
  }

  private patchState(patch: Partial<NewsState>): void {
    this.stateSubject.next({
      ...this.snapshot,
      ...patch,
    });
  }

  init(): void {
    if (this.snapshot.news.length > 0) return;
    this.fetchNextPage();
  }

  fetchNextPage(): void {
    if (this.snapshot.loading || !this.snapshot.hasMore) return;

    const pageToLoad = this.snapshot.nextPage;
    const limit = this.snapshot.limit;

    this.patchState({ loading: true });

    this.newsService.fetchAllNews(pageToLoad, limit)
      .pipe(
        finalize(() => this.patchState({ loading: false })),
        map(response => {
          const newItems = response.news ?? [];
          const mergedNews = [...this.snapshot.news, ...newItems];
          const totalCount = response.totalCount ?? 0;

          this.patchState({
            news: mergedNews,
            totalCount,
            nextPage: pageToLoad + 1,
            hasMore: mergedNews.length < totalCount,
          });
        }),
        catchError((error) => {
          console.error('Ошибка загрузки новостей', error);

          return EMPTY;
        })
      )
      .subscribe();
  }
}
