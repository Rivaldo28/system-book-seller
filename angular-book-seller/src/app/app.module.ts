import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/guest/login/login.component';
import { RegisterComponent } from './components/guest/register/register.component';
import { HomeComponent } from './components/guest/home/home.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { UnauthorizedComponent } from './components/error/unauthorized/unauthorized.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Importa HTTP_INTERCEPTORS
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

// Componentes e o novo Interceptor
import { BookComponent } from './modal/book/book.component';
import { DeletebookComponent } from './modal/deletebook/deletebook.component';
import { HomeModalComponent } from './modal/home-modal/home-modal.component';
import { LogoutComponent } from './modal/logout/logout.component';
import { BookFormComponent } from './components/admin/admin/form/book-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { LandingComponent } from './components/guest/landing/landing.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { JwtInterceptor } from './helpers/jwt.interceptor'; // Importa o Interceptor que criamos

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    AdminComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    NavbarComponent,
    BookComponent,
    DeletebookComponent,
    HomeModalComponent,
    LogoutComponent,
    BookFormComponent,
    SpinnerComponent,
    LandingComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    // REGISTRA O INTERCEPTOR: Diz ao Angular para usar nosso 'porteiro' em todos os pedidos HTTP
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
