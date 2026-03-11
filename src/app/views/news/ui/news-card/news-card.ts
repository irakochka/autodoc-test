import {Component, input} from '@angular/core';
import {News} from '@shared';
import {DatePipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-news-card',
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './news-card.html',
  styleUrl: './news-card.scss',
})
export class NewsCard {
  newsItem = input.required<News>();
}
