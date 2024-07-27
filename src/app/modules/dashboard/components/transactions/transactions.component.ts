// Onboarding component

import { Component } from "@angular/core";



@Component({
    selector: 'app-transactions',
    standalone: true,
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {

    totalInvestment = {
        amount: 524,
        change: 5.4,
        changeAmount: 0.8923,
        positive: true
    };

    totalReturn = {
        amount: 4275.28,
        change: 5.4,
        gain: 230.87,
        positive: true
    };
}