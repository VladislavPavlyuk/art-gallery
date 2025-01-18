import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { ArtworkService, Artwork } from '../artwork.service';

@Component({
  selector: 'app-artwork-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './artwork-detail.component.html',
  styleUrls: ['./artwork-detail.component.css']
})
export class ArtworkDetailComponent implements OnInit {
  artwork!: Artwork;

  constructor(private route: ActivatedRoute, private artworkService: ArtworkService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.artwork = this.artworkService.getArtworkById(id)!;
  }
}
