import { Injectable } from "@angular/core";
import { Apollo, gql, Query } from "apollo-angular";
import { BehaviorSubject, firstValueFrom, map } from "rxjs";
import { ApolloError } from '@apollo/client/core';
import { User } from "../../graphql/generated-types";

const ME = gql`
query Me {
  me {
    id
    createdAt
    updatedAt
    username
    email
    isAdmin
    balance
  }
}
`;

@Injectable({
    providedIn: 'root',
})
export class UserService {
    currentUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
    
    constructor(private readonly apollo: Apollo) { }

    onMe() {
        // Call the me query
        return firstValueFrom(this.apollo.query({
            query: ME
        }).pipe(
            map(result => {
                console.log(result);
                return result;
            })
        ))
    }

    onSetCurrentUser(user: User) {
        this.currentUser.next(user);
    }

    onGetCurrentUser() {
        return this.currentUser.asObservable();
    }

    onGetLastUser() {
        return this.currentUser.getValue();
    }
}
