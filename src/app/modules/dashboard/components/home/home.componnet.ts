// Onboarding component

import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { StockListComponent } from "../../../../shared/component/stock-list/stock-list.component";
import { TrendListComponent } from "../../../../shared/component/trend-list/trend-list.component";
import { PortfolioService } from "../../../../shared/services/portfolio.service";
import { UserService } from "../../../../shared/services/user.service";
import { News, Portfolio, PortfolioResponse, TopLosersGainers, User } from "../../../../graphql/generated-types";
import { Subscription } from "rxjs";
import { ApolloError } from "@apollo/client/errors";
import { MarketService } from "../../../../shared/services/market.service";
import { NewsService } from "../../../../shared/services/news.service";
import { WatchlistService } from "../../../../shared/services/watchlist.service";
import { WatchlistCarouselComponent } from "../../../../shared/component/watchlist-carousel/watchlist-carousel.component";
import { WalletWidgetComponent } from "../../../../shared/component/wallet-widget/wallet-widget.component";
import { MarketChartWidgetComponent } from "../../../../shared/component/market-chart-widget/market-chart-widget.component";
import { SnapshotComponent } from "../../../../shared/component/snapshot/snapshot.component";
import { PortfolioAnalysisComponent } from "../../../../shared/component/portfolio-analysis/portfolio-analysis.component";
import { RecentTransactionComponent } from "../../../../shared/component/recent-transaction/recent-transaction.component";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
    CommonModule,
    StockListComponent,
    TrendListComponent,
    WatchlistCarouselComponent,
    WalletWidgetComponent,
    MarketChartWidgetComponent,
    SnapshotComponent,
    PortfolioAnalysisComponent,
    RecentTransactionComponent
],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    currentStart = 0;
    currentEnd = 4;
    p: Portfolio = {
        id: '1',
        createdAt: '2023-07-27T09:00:00Z',
        updatedAt: '2023-07-27T09:00:00Z',
        name: 'Test',
        description: 'Test'
    } as Portfolio;

    portfoliosMain: PortfolioResponse[] = []
    portfolios: PortfolioResponse[] = [
        {
            portfolio: this.p,
            investment: 100,
            return: 10,
            returnPercentage: 10
        }
    ]


    // interface Stock {
    //     name: string;
    //     symbol: string;
    //     price: string;
    //     change: string;
    //     changePercentage: string;
    //     logoUrl: string;
    //     isPositiveChange: boolean;
    //   }

    stocks = [
        {
            name: 'Apple',
            symbol: 'AAPL',
            price: '$100',
            change: '0.5',
            changePercentage: '0.5%',
            logoUrl: 'https://via.placeholder.com/150',
            isPositiveChange: true
        },
        {
            name: 'Alphabet',
            symbol: 'GOOGL',
            price: '$500',
            change: '0.5',
            changePercentage: '0.5%',
            logoUrl: 'https://via.placeholder.com/150',
            isPositiveChange: true
        },
        {
            name: 'Microsoft',
            symbol: 'MSFT',
            price: '$200',
            change: '0.5',
            changePercentage: '0.5%',
            logoUrl: 'https://via.placeholder.com/150',
            isPositiveChange: false
        },
        {
            name: 'Amazon',
            symbol: 'AMZN',
            price: '$300',
            change: '0.5',
            changePercentage: '0.5%',
            logoUrl: 'https://via.placeholder.com/150',
            isPositiveChange: true
        },
        {
            name: 'Facebook',
            symbol: 'FB',
            price: '$400',
            change: '0.5',
            changePercentage: '0.5%',
            logoUrl: 'https://via.placeholder.com/150',
            isPositiveChange: false
        },
        {
            name: 'Tesla',
            symbol: 'TSLA',
            price: '$600',
            change: '0.5',
            changePercentage: '0.5%',
            logoUrl: 'https://via.placeholder.com/150',
            isPositiveChange: false
        },
        {
            name: 'NVIDIA Corporation',
            symbol: 'NVDA',
            price: '$700',
            change: '0.5',
            changePercentage: '0.5%',
            logoUrl: 'https://via.placeholder.com/150',
            isPositiveChange: true
        },
        {
            name: 'PayPal Holdings Inc',
            symbol: 'PYPL',
            price: '$800',
            change: '0.5',
            changePercentage: '0.5%',
            logoUrl: 'https://via.placeholder.com/150',
            isPositiveChange: false
        },
        {
            name: 'Netflix Inc',
            symbol: 'NFLX',
            price: '$900',
            change: '0.5',
            changePercentage: '0.5%',
            logoUrl: 'https://via.placeholder.com/150',
            isPositiveChange: true
        }
    ]

    trends = this.stocks.slice(0, 5);

    newsList: News[] = [];
    newsHighlight: News = {} as News;


    userObs: Subscription = new Subscription();
    user: User | null = null;
    markteTrends: TopLosersGainers | null = null;
    youdhaTrends: TopLosersGainers | null = null;

    constructor(
        private portfolioService: PortfolioService, private userService: UserService, private mrktService: MarketService, 
        private newsService: NewsService, private watchlistService: WatchlistService
        ) {
            this.onRefresh();
        }

    onRefresh(): void {
        this.userObs = this.userService.onGetCurrentUser().subscribe(user => {
            this.user = user;
            if (user == null) {
                return;
            }
            this.getPortfolio();
            this.getMarketTrends();
            this.getYodhaTrends();
            this.getNews();
            this.getWatchlist();
        });;
    }

    getPortfolio(): void {
        if (this.user == null) {
            return;
        }
        this.portfolioService.onGetPortfolioByUser(this.user.id).then(result => {
            const data = result.data as any;
            const portfolios = data.portfoliosByUser as PortfolioResponse[];
            this.portfoliosMain = portfolios;
            console.log(result);
        }).catch((error: ApolloError) => {
            console.log("Gql error", error.graphQLErrors);
            console.log("Network error", error.networkError);
        });
    }

    getMarketTrends(): void {
        this.mrktService.onMarketTrends().then(result => {
            const data = result.data as any
            this.markteTrends = data.marketTrends as TopLosersGainers;
            console.log("marketTrends", this.markteTrends);
        }).catch((error: ApolloError) => {
            console.log("Gql error", error.graphQLErrors);
            console.log("Network error", error.networkError);
        });
    }

    getYodhaTrends(): void {
        this.mrktService.onYodhaTrends().then(result => {
            console.log(result);
            const data = result.data as any
            this.youdhaTrends = data.yodhaTrends as TopLosersGainers;
        }).catch((error: ApolloError) => {
            console.log("Gql error", error.graphQLErrors);
            console.log("Network error", error.networkError);
        });
    }

    getNews(): void {
        this.newsService.onPaginatedNews(6, 0, 'DESC', 'published_at').then(result => {
            console.log('news', result);
            const data = result.data as any
            const news = data.news as News[];
            if (news.length == 0) {
                return;
            }
            this.newsHighlight = news[0];
            this.newsList = news.slice(1);
        }).catch((error: ApolloError) => {
            console.log("Gql error", error.graphQLErrors);
            console.log("Network error", error.networkError);
        });
    }

    getWatchlist(): void {
        this.watchlistService.getWatchlist().then(result => {
            console.log('watchlist', result);
        }).catch((error: ApolloError) => {
            console.log("Gql error", error.graphQLErrors);
            console.log("Network error", error.networkError);
        });
    }

    ngOnInit(): void {
        this.portfolios = this.portfoliosMain.slice(this.currentStart, this.currentEnd);
    }

    moveCarousel(position: number): void {
        if (this.portfoliosMain.length < this.currentEnd + position) {
            return;
        }
        this.currentStart = this.currentStart + position;
        this.currentEnd = this.currentEnd + position;
        this.portfolios = this.portfoliosMain.slice(this.currentStart, this.currentEnd);
    }

    ngOnDestroy(): void {
        this.userObs.unsubscribe();
    }

}