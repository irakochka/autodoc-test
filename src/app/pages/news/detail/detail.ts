import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SafeHtmlPipe} from '@shared/pipes';
import {NewsService} from '@shared/services';
import {News} from '@shared/interfaces';
import {ImagePreview, PublishedDate} from '@features/news';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    SafeHtmlPipe,
    PublishedDate,
    ImagePreview
  ],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
