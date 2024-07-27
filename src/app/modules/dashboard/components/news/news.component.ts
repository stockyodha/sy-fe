// Onboarding component

import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";



@Component({
    selector: 'app-news',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss']
})
export class NewsComponent {
    slides = [
        {
            category: 'NSE Stocks',
            meta: 'Agence France-Presse - 04 June 2023',
            title: 'Sensex In The Top Leading Stocks In Past 48 Hrs.',
            description: 'The Euro Lead Top history with highest points gained in 48 hrs on 03 June 2023.'
        },
        {
            category: 'NSE Stocks',
            meta: 'Agence France-Presse - 05 June 2023',
            title: 'Nifty Hits All-Time High.',
            description: 'The Nifty index reached an all-time high with unprecedented gains in the stock market.'
        },
        // Add more slides as needed
    ];

    newsList = [
        {
            title: 'TradeFace – 03 June 2023',
            subtitle: 'Closing Bell: Sensex gains 65 pts, Nifty ends near 22,400',
            description: 'Sensex after gaining 65 points on june 01, 2023 declares it’s jump to 77 pts in the next 48 hrs leading to Nifty loss of $ 22,440.',
            image: 'https://via.placeholder.com/80'
        },
        {
            title: 'TradeFace – 03 June 2023',
            subtitle: 'Closing Bell: Sensex gains 65 pts, Nifty ends near 22,400',
            description: 'Sensex after gaining 65 points on june 01, 2023 declares it’s jump to 77 pts in the next 48 hrs leading to Nifty loss of $ 22,440.',
            image: 'https://via.placeholder.com/80'
        },
        {
            title: 'TradeFace – 03 June 2023',
            subtitle: 'Closing Bell: Sensex gains 65 pts, Nifty ends near 22,400',
            description: 'Sensex after gaining 65 points on june 01, 2023 declares it’s jump to 77 pts in the next 48 hrs leading to Nifty loss of $ 22,440.',
            image: 'https://via.placeholder.com/80'
        },
    ];

    highlightedNews = {
        category: 'NSE Stocks',
        subtitle: "Debits - 03 June 2023",
        title: 'Sensex In The Top Leading Stocks In Past 48 Hrs.'
    };

    currentSlide = 0;
    slideInterval: any;

    ngOnInit() {
        this.startSlideShow();
    }

    startSlideShow() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 3000); // Change slide every 3 seconds
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }

    selectSlide(index: number) {
        this.currentSlide = index;
        clearInterval(this.slideInterval);
        this.startSlideShow();
    }

    ngOnDestroy() {
        clearInterval(this.slideInterval);
    }
}