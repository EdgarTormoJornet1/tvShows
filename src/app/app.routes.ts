import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TvshowDetailComponent } from './tvshows/tvshow-detail/tvshow-detail.component';
import { CreateTvShowComponent } from './tvshows/create-tvshow/create-tvshow.component';
import { supabaseLoginGuard } from './guards/supabase-login.guard';
import { EditTvshowComponent } from './tvshows/edit-tvshow/edit-tvshow.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'main', component: MainComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'create', component: CreateTvShowComponent, canActivate:[supabaseLoginGuard]},
    {path: 'edit_tvshow/:id', component: EditTvshowComponent, canActivate:[supabaseLoginGuard]},
    {path: 'tvshow/:id', component: TvshowDetailComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'home'},
    

];
