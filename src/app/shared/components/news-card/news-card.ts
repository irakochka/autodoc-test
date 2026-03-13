import {Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {News} from '@shared/interfaces';
import {PublishedDate} from '@shared/components/published-date/published-date';

@Component({
  selector: 'app-news-card',
  imports: [
    RouterLink,
    PublishedDate,
  ],
  templateUrl: './news-card.html',
  styleUrl: './news-card.scss',
})
export class NewsCard {
  newsItem = input.required<News>();
}
