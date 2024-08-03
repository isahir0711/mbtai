import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { GetanalisysComponent } from './pages/getanalisys/getanalisys.component';
import { authGuard } from './guards/auth.guard';
import { CallbackComponent } from './pages/callback/callback.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},

    {path: 'GetAnalysis', component: GetanalisysComponent,canActivate: [authGuard]},
    {path: 'Login', component: LoginComponent},
    {path:'**',redirectTo:''}
];
