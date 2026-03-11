import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {News, NewsService, SafeHtmlPipe} from '@shared';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-news-details',
  imports: [
    SafeHtmlPipe,
    DatePipe
  ],
  templateUrl: './news-details.html',
  styleUrl: './news-details.scss',
})
export class NewsDetails implements OnInit {
  route = inject(ActivatedRoute);
  newsService = inject(NewsService);

  news = signal<News | null>(null);

  ngOnInit() {
    const category = this.route.snapshot.paramMap.get('category');
    const slug = this.route.snapshot.paramMap.get('slug');

    if (!category || !slug) return;

    this.newsService.fetchNewsDetails(category, slug).subscribe(val => {
      this.news.set(val);
    })
  }
}
