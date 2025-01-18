import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { ArtworkService, Artwork } from '../artwork.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  artworks: Artwork[] = [];

  constructor(private artworkService: ArtworkService,private router: Router) { }

  ngOnInit(): void {
    this.artworks = this.artworkService.getArtworks();
  }
  selectArtwork(id: number): void {
    this.router.navigate(['/artwork', id]);
  }
}
