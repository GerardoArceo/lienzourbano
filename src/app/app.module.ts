import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ROUTES } from './routes';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/home/components/login/login.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/home/components/register/register.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AddArtworkComponent } from './pages/menu/components/add-artwork/add-artwork.component';
import { ArtworkComponent } from './pages/artwork/artwork.component';
import { ArtworksComponent } from './shared/artworks/artworks.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { ImagePipe } from './pipes/image.pipe';
import { CategoriesComponent } from './pages/home/components/categories/categories.component';
import { BackComponent } from './shared/back/back.component';
import { AuctionsComponent } from './pages/auctions/auctions.component';
import { TopComponent } from './components/navbar/components/top/top.component';
import { SearchComponent } from './components/navbar/components/search/search.component';
import { UserComponent } from './shared/user/user.component';
import { UsersComponent } from './shared/users/users.component';
import { CreatedAuctionsComponent } from './pages/menu/components/created-auctions/created-auctions.component';
import { InfoComponent } from './pages/info/info.component';
import { ChatComponent } from './shared/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ImagePipe,
    LoginComponent,
    RegisterComponent,
    MenuComponent,
    AddArtworkComponent,
    ArtworkComponent,
    ChatComponent,
    ArtworksComponent,
    LoadingComponent,
    CategoriesComponent,
    BackComponent,
    AuctionsComponent,
    TopComponent,
    SearchComponent,
    UserComponent,
    UsersComponent,
    CreatedAuctionsComponent,
    InfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    SweetAlert2Module.forRoot(),
    ToastrModule.forRoot(),
    RouterModule.forRoot(ROUTES, {useHash: true}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
