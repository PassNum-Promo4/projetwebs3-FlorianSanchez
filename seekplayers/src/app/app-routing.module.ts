import {NgModule, Component} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { PlayersComponent } from './players/players.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { AccountComponent } from './account/account.component';
import { NewuserComponent } from './newuser/newuser.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/players',
        pathMatch: 'full'
    },
    {
        path: 'players',
        component: PlayersComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'account',
        component: AccountComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'newuser',
        component: NewuserComponent
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
