import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './components/register/register.component';
import { RequestResetPasswordComponent } from './components/request-reset-password/request-reset-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { VerifyAcountComponent } from './components/verify-acount/verify-acount.component';

const routes: Routes = [
  { path: '', redirectTo: "login", pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'request-password', component: RequestResetPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'verify-account', component: VerifyAcountComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
