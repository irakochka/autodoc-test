import {Component, input} from '@angular/core';
import {DatePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {News} from '@shared/interfaces';

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
