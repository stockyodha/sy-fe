import { Component } from "@angular/core";
import { AuthService } from "../../../../shared/services/auth.service";
import { ApolloError } from "@apollo/client/errors";
import { User } from "../../../../graphql/generated-types";
import { Router } from "@angular/router";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
    username: string = "";
    email: string = "";
    password: string = "";
    confirmPassword: string = "";
    passwordVisible: boolean = false;
    confirmPasswordVisible: boolean = false;

    constructor(private authService: AuthService, private router: Router) { }

    isFormValid(): boolean {
        return this.username.length > 0 && this.isEmailValid() && this.password.length >= 4 && this.password === this.confirmPassword;
    }

    isEmailValid(): boolean {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(this.email);
    }

    togglePasswordVisibility() {
        this.passwordVisible = !this.passwordVisible;
    }

    toggleConfirmPasswordVisibility() {
        this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }

    onSubmit() {
        if (!this.isFormValid()) {
            console.error('Form is not valid!');
            return;
        }

        console.log('Username:', this.username);
        console.log('Email:', this.email);
        console.log('Password:', this.password);
        // Add your signup logic here

        this.authService.onSignup(this.username, this.email, this.password).then(result => {
            const data = result.data as any;
            const user = data["register"]["user"] as User;
            const token = data["register"]["token"];
            const refreshToken = data["register"]["refreshToken"];

            // Save tokens to local storage
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            console.log(result, user, token, "refreshToken", refreshToken);

            // Redirect or perform other actions
            this.router.navigate(['/dashboard/home']);
        }).catch((error: ApolloError) => {
            console.error("GraphQL Error: ", error.graphQLErrors);
            console.error("Network Error: ", error.networkError);
            throw error;
        })
    }
}
