import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SidebarService {
    isOpen = true;
    currentUI = 'light';
    constructor() { }

    toggleSidebar() {
        this.isOpen = !this.isOpen;
    }

    toggleUIMode() {
        if (this.currentUI === 'light') {
            this.currentUI = 'dark';
        } else {
            this.currentUI = 'light';
        }
        document.body.classList.toggle(this.currentUI);
    }

    getUIMode() {
        return this.currentUI;
    }

    getSidebarState() {
        return this.isOpen;
    }
}