import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ArtworkComponent } from './artwork/artwork.component';
import { ArtworkDetailComponent } from './artwork-detail/artwork-detail.component';
import { ArtworkService } from './artwork.service';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: GalleryComponent },
  { path: 'artwork/:id', component: ArtworkDetailComponent }
];

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ArtworkService],
})
export class AppModule { }
