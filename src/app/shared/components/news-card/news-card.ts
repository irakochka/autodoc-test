import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {News} from '@shared/interfaces';
import {PublishedDate} from '@shared/components/published-date/published-date';
import {ImagePreview} from '@shared/components';

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
