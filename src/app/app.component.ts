import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { RouterModule, RouterOutlet } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { ArtworkDetailComponent } from './artwork-detail/artwork-detail.component';
import { ArtworkComponent } from "./artwork/artwork.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    RouterModule,
    RouterOutlet,
    GalleryComponent,
    ArtworkComponent,
    ArtworkDetailComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'art-gallery';
}
