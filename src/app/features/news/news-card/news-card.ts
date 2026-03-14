import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {News} from '@shared/interfaces';
import {PublishedDate} from '@features/news/published-date/published-date';
import {ImagePreview} from '@features/news';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [
    RouterLink,
    PublishedDate,
    ImagePreview,
  ],
  templateUrl: './news-card.html',
  styleUrl: './news-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsCard {
  news = input.required<News>();
}
