import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './slices/header/header.component';
import { FooterComponent } from './slices/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/get-started/sign-up/sign-up.component';
import { AddTaskComponent } from './slices/add-task/add-task.component';
import { SearchComponent } from './slices/search/search.component';
import { ProfileComponent } from './slices/profile/profile.component';
import { FiltersComponent } from './slices/filters/filters.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterService } from './services/filters.service';
import { GetStartedComponent } from './pages/get-started/get-started.component';
import { SignInComponent } from './pages/get-started/sign-in/sign-in.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    HomeComponent,
    SignUpComponent,
    AddTaskComponent,
    SearchComponent,
    ProfileComponent,
    FiltersComponent,
    GetStartedComponent,
    SignInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
    ),
    FilterService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
