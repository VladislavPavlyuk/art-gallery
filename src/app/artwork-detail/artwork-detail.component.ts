import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ArtworkService, Artwork } from '../artwork.service';
import { ImageLoaderDirective } from '../directives/image-loader.directive';

@Component({
  selector: 'app-artwork-detail',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule,
    ImageLoaderDirective
  ],
  templateUrl: './artwork-detail.component.html',
  styleUrls: ['./artwork-detail.component.css']
})
export class ArtworkDetailComponent implements OnInit {
  artwork: Artwork | null = null;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private artworkService: ArtworkService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.artworkService.getArtworkById(id).subscribe({
        next: (foundArtwork) => {
          if (foundArtwork) {
            this.artwork = foundArtwork;
          } else {
            this.error = 'Картина не найдена';
          }
        },
        error: (error) => {
          console.error('Ошибка при загрузке картины:', error);
          this.error = 'Ошибка при загрузке данных';
        }
      });
    } else {
      this.error = 'Неверный идентификатор картины';
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
