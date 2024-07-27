// Onboarding component

import { Component } from "@angular/core";
import { AuthService } from "../../../../shared/services/auth.service";
import { ApolloError } from "@apollo/client/errors";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "../../../../graphql/generated-types";
import { Router } from "@angular/router";

@Component({
    selector: 'app-onboarding',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm: FormGroup;
    showPassword = false;

    constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(5)]]
        });
    }
    onSubmit() {
        if (this.loginForm.valid) {
            // Handle form submission
            console.log(this.loginForm.value);
        } else {
            // Handle form errors
            this.loginForm.markAllAsTouched();
        }
        this.authService.onLogin(this.loginForm.value.username, this.loginForm.value.password).then((result) => {
            const data = result.data as any;
            const user = data["login"]["user"] as User;
            const token = data["login"]["token"];
            const refreshToken = data["login"]["refreshToken"];

            // Save tokens to local storage
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            console.log(result, user, token, "refreshToken", refreshToken);

            // Redirect or perform other actions
            this.router.navigate(['/dashboard/home']);
            console.log(result);
        }).catch((error: ApolloError) => {
            console.error("GraphQL Error: ", error.graphQLErrors);
            console.error("Network Error: ", error.networkError);
            throw error;
        });
    }


    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }
}