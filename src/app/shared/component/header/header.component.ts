// Onboarding component

import { Component } from "@angular/core";
import { SidebarService } from "../../services/sidebar.service";
import { SearchComponent } from "../searchbar/search-bar.component";
import { CommonModule } from "@angular/common";



@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [CommonModule, SearchComponent]
})
export class HeaderComponent {
    constructor(private sidebarService: SidebarService) { }
    title = 'overview';
    isOpen() {
        return this.sidebarService.getSidebarState();
    }
}