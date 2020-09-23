import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ContactComponent } from './contact/contact.component';
import { ContactdetailComponent } from './contactdetail/contactdetail.component'
import { LoginComponent } from './login/login.component'
import { RegistrationComponent } from './registration/registration.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';


const routes: Routes = [
  { path: 'contact', component: ContactdetailComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'contactdetail', component: ContactComponent, canActivate:[AuthGuard] },
  { path: 'contactdetail/{idContact}', component: ContactComponent, canActivate:[AuthGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
