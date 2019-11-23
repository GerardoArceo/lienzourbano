import {Routes} from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ArtworkComponent } from './pages/artwork/artwork.component';
import { AuctionsComponent } from './pages/auctions/auctions.component';
import { InfoComponent } from './pages/info/info.component';

export const ROUTES: Routes = [
    {path: 'info', component: InfoComponent},
    {path: 'home', component: HomeComponent},
    {path: 'menu', component: MenuComponent},
    {path: 'artwork', component: ArtworkComponent},
    {path: 'auctions', component: AuctionsComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'home'},
];
