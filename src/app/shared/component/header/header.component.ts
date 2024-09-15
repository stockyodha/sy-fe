// Onboarding component

import { Component } from "@angular/core";
import { SidebarService } from "../../services/sidebar.service";



@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    constructor(private sidebarService: SidebarService) { }
    title = 'overview';
    isOpen() {
        return this.sidebarService.getSidebarState();
    }
}