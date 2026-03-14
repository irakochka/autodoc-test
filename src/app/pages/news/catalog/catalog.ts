import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {NewsStore} from '@shared/store/news-store';
import {map} from 'rxjs';
import {NewsCard} from '@features/news';
import {InfiniteScrollTrigger} from '@shared/components';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    NewsCard,
    InfiniteScrollTrigger
  ],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Catalog implements OnInit {
  private readonly newsStore = inject(NewsStore);

  news = toSignal(
    this.newsStore.state$.pipe(map(state => state.news)),
    { initialValue: [] }
  );

  loading = toSignal(
    this.newsStore.state$.pipe(map(state => state.loading)),
    { initialValue: false }
  );

  hasMore = toSignal(
    this.newsStore.state$.pipe(map(state => state.hasMore)),
    { initialValue: true }
  );

  ngOnInit(): void {
    this.newsStore.init();
  }

  timeToFetch(): void {
    this.newsStore.fetchNextPage();
  }
}
