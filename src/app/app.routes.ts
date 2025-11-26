import { Routes } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { ArtworkDetailComponent } from './artwork-detail/artwork-detail.component';

export const routes: Routes = [
  { path: '', component: GalleryComponent },
  { path: 'artwork/:id', component: ArtworkDetailComponent },
  { path: '**', redirectTo: '' }
];
