import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GetStartedComponent } from './pages/get-started/get-started.component';

const routes: Routes = [
      {
          path: '',
          title: 'Welcome | Agatha',
          component: HomeComponent,
      },
      {
          path: 'dashboard',
          title: 'Dashboard',
          component: DashboardComponent,
      },
      {
          path: 'get-started',
          title: 'Getting Started',
          component: GetStartedComponent,
      },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}