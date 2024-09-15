// Onboarding component

import { Component } from "@angular/core";
import { SidebarService } from "../../services/sidebar.service";



@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    constructor(private sidebarService: SidebarService) { }

    toggleSidebar() {
        this.sidebarService.toggleSidebar();
    }

    toggleUIMode() {
        this.sidebarService.toggleUIMode();
    }

    isOpen() {
        return this.sidebarService.getSidebarState();
    }

    isDarkMode() {
        return this.sidebarService.getUIMode() === 'dark';
    }
}