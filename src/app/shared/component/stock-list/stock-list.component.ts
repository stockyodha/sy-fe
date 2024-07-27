// Onboarding component

import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

interface Stock {
    name: string;
    symbol: string;
    price: string;
    change: string;
    changePercentage: string;
    logoUrl: string;
    isPositiveChange: boolean;
  }

@Component({
    selector: 'app-stock-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './stock-list.component.html',
    styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent {
    @Input() stocks: Stock[] = [];
    @Input() title: string = '';

    currentStart = 0;
    currentEnd = 6;

    stocksList: Stock[] = [];

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.currentEnd = this.stocks.length > 6 ? 6 : this.stocks.length;
        console.log(this.stocks, this.currentEnd);
        this.stocksList = this.stocks.slice(this.currentStart, this.currentEnd);
    }

    moveCarousel(position: number): void {
        if (this.stocks.length< this.currentEnd + position) {
            return;
        }
        this.currentStart = this.currentStart + position;
        this.currentEnd = this.currentEnd + position;
        this.stocksList = this.stocks.slice(this.currentStart, this.currentEnd);
    }
}