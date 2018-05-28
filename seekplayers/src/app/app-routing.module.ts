import {NgModule, Component} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { PlayersComponent } from './players/players.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SpecialPlayersComponent } from './special-players/special-players.component';
import { AuthGuard } from './auth.guard';
import { AccountComponent } from './account/account.component';

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
        path: 'special',
        component: SpecialPlayersComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'account',
        component: AccountComponent
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
