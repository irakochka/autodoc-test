import {Component, inject, OnInit} from '@angular/core';
import { NewsService } from '@shared/services';
import {News} from '@shared/interfaces';
import {NewsCard} from '@shared/components';

@Component({
  selector: 'app-catalog',
  imports: [
    NewsCard
  ],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog implements OnInit {
  newsService = inject(NewsService);
  news!: News[];

  ngOnInit() {
    this.newsService.fetchAllNews(1, 10).subscribe((val) => {
      this.news = val.news;
    });
  }
}
