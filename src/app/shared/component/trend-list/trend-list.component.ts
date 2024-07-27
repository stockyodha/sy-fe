import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockMarketData, TopLosersGainers } from '../../../graphql/generated-types';

@Component({
  selector: 'app-trend-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trend-list.component.html',
  styleUrls: ['./trend-list.component.scss']
})
export class TrendListComponent {
  @Input() marketData: TopLosersGainers | null = null;
  @Input() title: string = "YODHA TRENDS";

  activeTab = 'gainer';
  activeMarket = 'NSE';
  stocks: StockMarketData[] = [];

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.setActiveMarket(this.activeMarket);
  }

  setActiveMarket(market: string) {
    console.log('Market', market);
    console.log('Active Tab', this.activeTab);
    console.log('Market Data', this.marketData);
    this.activeMarket = market;
    if (market === 'NSE' && this.activeTab === 'gainer') {
      this.stocks = this.marketData?.GainersNse || [];
    } else if (market === 'NSE' && this.activeTab === 'loser') {
      this.stocks = this.marketData?.LosersNse || [];
    } else if (market === 'BSE' && this.activeTab === 'gainer') {
      this.stocks = this.marketData?.GainersBse || [];
    } else if (market === 'BSE' && this.activeTab === 'loser') {
      this.stocks = this.marketData?.LosersBse || [];
    } else {
      this.stocks = [];
    }
    console.log('Stocks', this.stocks) ;
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log('Changes', changes);
    if (changes["stocksNse"]) {
      console.log('Stocks NSE', changes);
      this.stocks = this.stocks
    }
  }
}
