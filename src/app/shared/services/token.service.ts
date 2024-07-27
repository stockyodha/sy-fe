import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class TokenService {
    getToken(): string | null {

        return localStorage.getItem('token');
    }

    saveToken(token: string): void {
        localStorage.setItem('token', token);
    }

    removeTokens(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    }

    getRefreshToken(): string | null {
        return localStorage.getItem('refreshToken');
    }
}