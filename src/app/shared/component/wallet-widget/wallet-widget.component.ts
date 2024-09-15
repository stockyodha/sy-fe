import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Stock, Watchlist, WatchlistStock } from '../../../graphql/generated-types';

@Component({
  selector: 'wallet-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wallet-widget.component.html',
  styleUrls: ['./wallet-widget.component.scss']
})
export class WalletWidgetComponent {
  
}
