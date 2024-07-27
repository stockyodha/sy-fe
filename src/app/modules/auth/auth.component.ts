import { Component } from "@angular/core";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
    constructor() {
        // Delete tokens from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    }
}