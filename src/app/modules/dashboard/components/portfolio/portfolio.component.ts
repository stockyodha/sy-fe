// Onboarding component

import { Component } from "@angular/core";



@Component({
    selector: 'app-portfolio',
    standalone: true,
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {
    constructor() { }
    portfolios = [
        {
            id: 1,
            title: 'Portfolio 1',
            description: 'This is a description of the portfolio',
            image: 'https://via.placeholder.com/150'
        },
        {
            id: 2,
            title: 'Portfolio 2',
            description: 'This is a description of the portfolio',
            image: 'https://via.placeholder.com/150'
        },
        {
            id: 3,
            title: 'Portfolio 3',
            description: 'This is a description of the portfolio',
            image: 'https://via.placeholder.com/150'
        },
        {
            id: 4,
            title: 'Portfolio 4',
            description: 'This is a description of the portfolio',
            image: 'https://via.placeholder.com/150'
        }
    ]
}