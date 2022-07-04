import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHousesComponent } from './components/views/add-houses/add-houses.component';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { ForgotPassComponent } from './components/views/forgot-pass/forgot-pass.component';
import { GerirMarcacoesComponent } from './components/views/gerir-marcacoes/gerir-marcacoes.component';
import { IntroComponent } from './components/views/intro/intro.component';
import { LoginComponent } from './components/views/login/login.component';
import { ProfileComponent } from './components/views/profile/profile.component';
import { RegisterWorkersComponent } from './components/views/register-workers/register-workers.component';
import { RegisterComponent } from './components/views/register/register.component';
import { VerifyEmailComponent } from './components/views/verify-email/verify-email.component';
import { AdminGuard } from './shared/guard/admin.guard';
import { AuthGuard } from './shared/guard/auth.guard';
import { ClientGuard } from './shared/guard/client.guard';
import { WorkerGuard } from './shared/guard/worker.guard';

const routes: Routes = [
  {path: "", component: IntroComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard,WorkerGuard] },
  { path: 'forgot-password', component: ForgotPassComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'workers', component: RegisterWorkersComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard, ClientGuard] },
  { path: 'add-house', component: AddHousesComponent, canActivate: [AuthGuard, ClientGuard] },
  { path: 'marcacoes', component: GerirMarcacoesComponent, canActivate: [AuthGuard, AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
