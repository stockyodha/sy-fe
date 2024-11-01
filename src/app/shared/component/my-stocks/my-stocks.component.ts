import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-my-stocks',
    templateUrl: './my-stocks.component.html',
    styleUrls: ['./my-stocks.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class MyStocksComponent {
    @Input() stocks = [
        { symbol: 'AAPL', name: 'Apple Inc', price: 15238, change: 5.9, changeType: 'positive', logo: 'https://placehold.co/150' },
        { symbol: 'GOGL', name: 'Google Corp', price: 6842, change: 5.9, changeType: 'positive', logo: 'https://placehold.co/150' },
        { symbol: 'SPOT', name: 'Spotify Technology SA', price: 12238, change: -5.9, changeType: 'negative', logo: 'https://placehold.co/150' },
        { symbol: 'TWTR', name: 'Twitter Inc', price: 55238, change: 5.9, changeType: 'positive', logo: 'https://placehold.co/150' }
    ];
}
