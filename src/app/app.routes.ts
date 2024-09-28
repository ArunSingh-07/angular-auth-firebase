import { Routes } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { FooterComponent } from './Components/footer/footer.component';
export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent ,
  },
  {
    path: 'login',
    component: LoginComponent ,
  },
  // {
  //   path: 'home',
  //   component: HomeComponent ,
  // },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent
  },
  {
    path: 'footer',
    component: FooterComponent
  }
];