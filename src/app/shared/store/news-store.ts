import {inject, Injectable} from '@angular/core';
import {News} from '@shared/interfaces';
import {BehaviorSubject, catchError, EMPTY, finalize, map} from 'rxjs';
import {NewsService} from '@shared/services';

export interface NewsState {
  news: News[];
  localNews: News[];
  remoteNews: News[];
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
  private readonly localStorageKey = 'custom_news';

  private readonly stateSubject = new BehaviorSubject<NewsState>({
    news: [],
    localNews: [],
    remoteNews: [],
    nextPage: 1,
    limit: 9,
    loading: false,
    hasMore: true,
    totalCount: 0,
  });

  readonly state$ = this.stateSubject.asObservable();

  get snapshot(): NewsState {
    return this.stateSubject.value;
  }

  private patchState(patch: Partial<NewsState>): void {
    const nextState = {
      ...this.snapshot,
      ...patch,
    };

    nextState.news = [...nextState.localNews, ...nextState.remoteNews];

    this.stateSubject.next(nextState);
  }

  init(): void {
    if (this.snapshot.news.length > 0) return;

    const localNews = this.readLocalNews();

    this.patchState({
      localNews,
      news: [...localNews],
    });

    this.fetchNextPage();
  }

  fetchNextPage(): void {
    if (this.snapshot.loading || !this.snapshot.hasMore) return;

    const pageToLoad = this.snapshot.nextPage;
    const limit = this.snapshot.limit;

    this.patchState({ loading: true });

    this.newsService.fetchAllNews(pageToLoad, limit)
      .pipe(
        map(response => {
          const newItems = response.news ?? [];
          const totalCount = response.totalCount ?? 0;

          const mergedRemoteNews = this.mergeUniqueById([
            ...this.snapshot.remoteNews,
            ...newItems,
          ]);

          this.patchState({
            remoteNews: mergedRemoteNews,
            totalCount,
            nextPage: pageToLoad + 1,
            hasMore: mergedRemoteNews.length < totalCount,
          });
        }),
        catchError((error) => {
          console.error('Ошибка загрузки новостей', error);
          return EMPTY;
        }),
        finalize(() => this.patchState({ loading: false })),
      )
      .subscribe();
  }

  createLocalNews(payload: {
    title: string;
    description: string;
    titleImageUrl: string;
  }): News {
    const newNews: News = {
      id: `local-${crypto.randomUUID()}`,
      title: payload.title,
      description: payload.description,
      titleImageUrl: payload.titleImageUrl,
      publishedDate: new Date().toISOString(),
      categoryType: 'local',
    };

    const updatedLocalNews = [newNews, ...this.snapshot.localNews];

    this.saveLocalNews(updatedLocalNews);

    this.patchState({
      localNews: updatedLocalNews,
    });

    return newNews;
  }

  private readLocalNews(): News[] {
    try {
      const raw = localStorage.getItem(this.localStorageKey);
      if (!raw) return [];

      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private saveLocalNews(news: News[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(news));
  }

  private mergeUniqueById(news: News[]): News[] {
    const map = new Map<string | number, News>();

    for (const item of news) {
      map.set(item.id, item);
    }

    return Array.from(map.values());
  }
}
