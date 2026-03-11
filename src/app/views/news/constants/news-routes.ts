import {Routes} from '@angular/router';
import { NewsList } from '../feature-news-page/news-list/news-list';
import { NewsDetails } from '../feature-news-page/news-details/news-details';

export const newsRoutes: Routes = [
  {
    path: '',
    component: NewsList,
  },
  {
    path: ':category/:slug',
    component: NewsDetails,
  },
];
