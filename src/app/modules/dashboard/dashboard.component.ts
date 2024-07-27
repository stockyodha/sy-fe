// Onboarding component

import { Component } from "@angular/core";
import { ApolloError } from "@apollo/client/errors";
import { UserService } from "../../shared/services/user.service";



@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    constructor(private userService: UserService) {
        this.userService.onMe().then((result) => {
            console.log(result);
            const data = result.data as any;
            const user = data["me"];
            this.userService.onSetCurrentUser(user);
        }).catch((error: ApolloError) => {
            console.error("GraphQL Error: ", error.graphQLErrors);
            console.error("Network Error: ", error.networkError);
            throw error;
        });
     }
}