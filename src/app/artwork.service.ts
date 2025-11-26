import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';

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

interface ArtworksResponse {
  artworks: Artwork[];
}

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  private artworksUrl = 'assets/artworks.json';
  private artworksCache$?: Observable<Artwork[]>;

  constructor(private http: HttpClient) { }

  getArtworks(): Observable<Artwork[]> {
    if (!this.artworksCache$) {
      this.artworksCache$ = this.http.get<ArtworksResponse>(this.artworksUrl).pipe(
        map(response => response.artworks),
        shareReplay(1) // Кэшируем результат для переиспользования
      );
    }
    return this.artworksCache$;
  }

  getArtworkById(id: number): Observable<Artwork | undefined> {
    return this.getArtworks().pipe(
      map(artworks => artworks.find(artwork => artwork.id === id))
    );
  }
}
