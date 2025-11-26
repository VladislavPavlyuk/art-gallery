import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { ArtworkService, Artwork } from '../artwork.service';
import { ImageLoaderDirective } from '../directives/image-loader.directive';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule,
    MatProgressSpinnerModule,
    ImageLoaderDirective
  ],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  artworks: Artwork[] = [];
  selectedArtwork: Artwork | null = null;
  visibleStartIndex: number = 0;
  visibleCount: number = 5;
  isLoading: boolean = true;
  infoPosition: 'left' | 'right' = 'left';

  @ViewChild('thumbnailContainer', { static: false }) thumbnailContainer!: ElementRef<HTMLDivElement>;

  constructor(private artworkService: ArtworkService, private router: Router) {
    // Определяем количество видимых элементов в зависимости от размера экрана
    this.updateVisibleCount();
    window.addEventListener('resize', () => this.updateVisibleCount());
  }

  private updateVisibleCount(): void {
    if (window.innerWidth <= 480) {
      this.visibleCount = 2;
    } else if (window.innerWidth <= 768) {
      this.visibleCount = 3;
    } else {
      this.visibleCount = 5;
    }
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.artworkService.getArtworks().subscribe({
      next: (artworks) => {
        this.artworks = artworks;
        if (this.artworks.length > 0) {
          this.selectedArtwork = this.artworks[0];
          this.randomizeInfoPosition();
          // Отладочная информация
          console.log('Artworks loaded:', this.artworks.length);
          this.artworks.forEach(artwork => {
            console.log(`Thumbnail URL for ${artwork.title}:`, artwork.thumbnailUrl);
          });
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Ошибка при загрузке картин:', error);
        this.isLoading = false;
      }
    });
  }

  private randomizeInfoPosition(): void {
    this.infoPosition = Math.random() < 0.5 ? 'left' : 'right';
  }

  selectArtwork(artwork: Artwork): void {
    // Сразу обновляем выбранное изображение для мгновенного отображения
    this.selectedArtwork = artwork;
    // Генерируем случайную позицию для информации
    this.randomizeInfoPosition();
    
    // Прокручиваем к выбранному элементу, если он не виден
    const index = this.artworks.findIndex(a => a.id === artwork.id);
    if (index !== -1) {
      // Если элемент находится до видимой области
      if (index < this.visibleStartIndex) {
        this.visibleStartIndex = Math.max(0, index);
        this.scrollToVisible();
      }
      // Если элемент находится после видимой области
      else if (index >= this.visibleStartIndex + this.visibleCount) {
        this.visibleStartIndex = Math.max(0, index - this.visibleCount + 1);
        this.scrollToVisible();
      }
    }
  }

  scrollLeft(): void {
    if (this.visibleStartIndex > 0) {
      this.visibleStartIndex--;
      this.scrollToVisible();
    }
  }

  scrollRight(): void {
    const maxStartIndex = Math.max(0, this.artworks.length - this.visibleCount);
    if (this.visibleStartIndex < maxStartIndex) {
      this.visibleStartIndex++;
      this.scrollToVisible();
    }
  }

  private scrollToVisible(): void {
    if (this.thumbnailContainer) {
      setTimeout(() => {
        const container = this.thumbnailContainer.nativeElement;
        const thumbnailItems = container.querySelectorAll('.thumbnail-item');
        if (thumbnailItems.length > 0 && this.visibleStartIndex < thumbnailItems.length) {
          const thumbnailWidth = (thumbnailItems[0] as HTMLElement).offsetWidth + 15; // 15px gap
          const scrollPosition = this.visibleStartIndex * thumbnailWidth;
          container.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
          });
        }
      }, 0);
    }
  }

  getVisibleArtworks(): Artwork[] {
    // Всегда показываем все изображения, но видимыми будут только 5
    return this.artworks;
  }

  canScrollLeft(): boolean {
    return this.visibleStartIndex > 0;
  }

  canScrollRight(): boolean {
    return this.visibleStartIndex < this.artworks.length - this.visibleCount;
  }

  viewDetails(id: number): void {
    this.router.navigate(['/artwork', id]);
  }

  onThumbnailError(event: Event, artwork: Artwork): void {
    const img = event.target as HTMLImageElement;
    console.error(`Failed to load thumbnail for ${artwork.title}:`, artwork.thumbnailUrl);
    // Пробуем использовать полное изображение как fallback
    if (artwork.thumbnailUrl !== artwork.imageUrl) {
      console.log(`Trying to use full image as fallback for ${artwork.title}`);
      img.src = artwork.imageUrl;
    } else {
      img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2RkZCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
    }
  }
}
