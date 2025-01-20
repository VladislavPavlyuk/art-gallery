import { Injectable } from '@angular/core';

export interface Artwork {
  id: number;
  title: string;
  year: number;
  author: string;
  dimensions: string;
  location: string;
  thumbnailUrl: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  private artworks: Artwork[] = [
    {
      id: 1,
      title: 'Starry Night',
      year: 1889,
      author: 'Vincent van Gogh',
      dimensions: '73.7 cm × 92.1 cm',
      location: 'Museum of Modern Art, New York City',
      thumbnailUrl: '/src/app/assets/images/starry-night_thumbnail.jpg',
      imageUrl: '/src/app/assets/images/starry-night.jpg'
    },
    {
      id:2,
      title:'Bedroom',
      year:1889,
      author:'Vincent van Gogh',
      dimensions: '',
      location: '',
      thumbnailUrl:'src/app/assets/images/Bedroom-oil-canvas-Vincent-van-Gogh-Art-1889_thumbnail.webp',
      imageUrl: 'src/app/assets/images/Bedroom-oil-canvas-Vincent-van-Gogh-Art-1889.webp'
    }
    // Добавьте больше картин здесь
  ];

  getArtworks(): Artwork[] {
    return this.artworks;
  }

  getArtworkById(id: number): Artwork | undefined {
    return this.artworks.find(artwork => artwork.id === id);
  }
}
