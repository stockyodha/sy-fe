import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Stock, Watchlist, WatchlistStock } from '../../../graphql/generated-types';

@Component({
  selector: 'app-watchlist-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './watchlist-carousel.component.html',
  styleUrls: ['./watchlist-carousel.component.scss']
})
export class WatchlistCarouselComponent {
  @Input() watchlist: WatchlistStock[] = [];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    
  }

  scrollCarousel(direction: string): void {
    const carousel = document.querySelector('.carousel') as HTMLElement;
    const itemWidth = 215; // 200px item + 15px margin

    if (direction === 'next') {
      carousel.scrollLeft += itemWidth;
    } else if (direction === 'prev') {
      carousel.scrollLeft -= itemWidth;
    }
  }

  removeFromWatchlist(synbol: string): void {
    for (let i = 0; i < this.watchlist.length; i++) {
      if (this.watchlist[i].stock.symbol === synbol) {
        this.watchlist.splice(i, 1);
        break;
      }
    }
  }

  navigateToDashboard(): void {
    // Navigate to dashboard
  }
}
