// Onboarding module

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from '../../shared/component/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.componnet';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { SearchComponent } from "../../shared/component/searchbar/search-bar.component";
import { HeaderComponent } from "../../shared/component/header/header.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent      },
      {
        path: 'portfolio',
        component: PortfolioComponent
      },
      {
        path: 'news',
        loadComponent: () => import('./components/news/news.component').then(m => m.NewsComponent)
      },
      {
        path: 'transactions',
        loadComponent: () => import('./components/transactions/transactions.component').then(m => m.TransactionsComponent)
      },
      {
        path: "**",
        redirectTo: "home"
      }
    ]
  },
];

@NgModule({
  declarations: [DashboardComponent, SidebarComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SearchComponent, HeaderComponent],
  exports: [RouterModule]
})
export class DashboardModule { }
// Path: src/app/modules/onboarding/onboarding-routing.module.ts
