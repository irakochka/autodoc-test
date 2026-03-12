import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/shall').then(c => c.Layout),
    children: [
      { path: '', redirectTo: 'news', pathMatch: 'full' },
      {
        path: 'news',
        children: [
          {
            path: '',
            loadComponent: () => import('@pages/news').then(c => c.Catalog),
          },
          {
            path: ':category/:slug',
            loadComponent: () => import('@pages/news').then(c => c.Detail),
          },
        ],
      },
    ]
  }
];
