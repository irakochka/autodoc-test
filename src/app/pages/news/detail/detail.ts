import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {SafeHtmlPipe} from '@shared/pipes';
import {NewsService} from '@shared/services';
import {News} from '@shared/interfaces';

@Component({
  selector: 'app-detail',
  imports: [
    SafeHtmlPipe,
    DatePipe
  ],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
})
export class Detail implements OnInit {
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
