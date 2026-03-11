import {Component, inject, OnInit} from '@angular/core';
import {News, NewsService} from '@shared';
import { NewsCard } from '@views/news/ui';

@Component({
  selector: 'app-news-list',
  imports: [
    NewsCard
  ],
  templateUrl: './news-list.html',
  styleUrl: './news-list.scss',
})
export class NewsList implements OnInit {
  newsService = inject(NewsService);
  news!: News[];

  ngOnInit() {
    this.newsService.fetchAllNews(1, 10).subscribe((val) => {
      this.news = val.news;
    });
  }
}
