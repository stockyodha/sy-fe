import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recent-transaction',
  templateUrl: './recent-transaction.component.html',
  styleUrls: ['./recent-transaction.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class RecentTransactionComponent {
  @Input() transactions = [
    { icon: 'figma', name: 'Figma', date: 'August 20, 2022', amount: 100, status: 'Completed' },
    { icon: 'youtube', name: 'Youtube', date: 'August 20, 2022', amount: 120, status: 'Completed' },
    { icon: 'spotify', name: 'Spotify', date: 'August 20, 2022', amount: 15, status: 'Completed' },
    { icon: 'freepik', name: 'Freepik', date: 'August 20, 2022', amount: 300, status: 'Completed' },
  ];
}
