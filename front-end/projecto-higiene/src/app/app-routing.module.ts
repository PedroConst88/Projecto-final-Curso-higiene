import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { ForgotPassComponent } from './components/views/forgot-pass/forgot-pass.component';
import { IntroComponent } from './components/views/intro/intro.component';
import { LoginComponent } from './components/views/login/login.component';
import { RegisterWorkersComponent } from './components/views/register-workers/register-workers.component';
import { RegisterComponent } from './components/views/register/register.component';
import { VerifyEmailComponent } from './components/views/verify-email/verify-email.component';
import { AdminGuard } from './shared/guard/admin.guard';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {path: "", component: IntroComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPassComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'register-workers', component: RegisterWorkersComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
