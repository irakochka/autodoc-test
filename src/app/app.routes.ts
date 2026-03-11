import { Routes } from '@angular/router';
import {newsRoutes} from '@views/news';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared').then(c => c.Layout),

    children: [
      { path: '', redirectTo: 'news', pathMatch: 'full' },
      {
        path: 'news',
        loadChildren: () => newsRoutes,
      },
    ]
  }
];
