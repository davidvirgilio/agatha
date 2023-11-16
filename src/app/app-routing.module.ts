import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GetStartedComponent } from './pages/get-started/get-started.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/get-started/sign-in/sign-in.component';

const routes: Routes = [
      {
          path: 'home',
          title: 'Welcome | Agatha',
          component: HomeComponent,
      },
      {
          path: '',
          title: 'Dashboard',
          component: DashboardComponent,
      },
      {
          path: 'test',
          title: 'Testing elements',
          component: SignUpComponent,
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