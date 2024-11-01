// Onboarding component

import { Component, Input } from "@angular/core";
import { SidebarService } from "../../services/sidebar.service";



@Component({
    selector: 'app-snapshot',
    templateUrl: './snapshot.component.html',
    styleUrls: ['./snapshot.component.scss'],
    standalone: true
})
export class SnapshotComponent {
    constructor() { }
    @Input() prevClose: number = 12051.48;
    @Input() open: number = 12000.21;
    @Input() dayLow: number = 11999.87;
    @Input() dayHigh: number = 12248.15;
    @Input() weekLow: number = 10440.64;
    @Input() weekHigh: number = 15265.42;
    @Input() currentValue: number = 12166.60;
    @Input() tradeTime: string = '05:16 PM';
    @Input() tradeDate: string = '01/27/23';

    calcPosition(min: number, max: number, value: number): number {
        if (max === min) return 50; // Avoid division by zero
        return ((value - min) / (max - min)) * 100;
    }
}