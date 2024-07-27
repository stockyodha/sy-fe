import { Injectable } from "@angular/core";
import { Apollo, gql, Query } from "apollo-angular";
import { firstValueFrom, map } from "rxjs";
import { ApolloError } from '@apollo/client/core';

const LOGIN_QUERY = gql`
query Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    user {
      id
      username
      email
      isAdmin
      balance
    }
    token
    refreshToken
  }
}
`;

const SIGNUP_MUTATION = gql`
mutation Register($input: RegisterInput!) {
  register(input: $input){
    user {
      id
      username
      email
      isAdmin
      balance
    }
    token
    refreshToken
  }
}
`;

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
export class AuthService {
    constructor(private readonly apollo: Apollo) { }


    onLogin(username: string, password: string) {
        console.log(username, password);
        // Call the login query
        return firstValueFrom(this.apollo.query({
            query: LOGIN_QUERY,
            variables: {
                "username": username,
                "password": password
            }
        }).pipe(
            map(result => {
                console.log(result);
                return result;
            })
        ))
    }

    onSignup(username: string, email: string, password: string) {
        // Call the signup mutation
        return firstValueFrom(this.apollo.mutate({
            mutation: SIGNUP_MUTATION,
            variables: {
                input: {
                    username,
                    email,
                    password
                }
            }
        }).pipe(
            map(result => {
                console.log(result);
                return result;
            })
        ))
    }

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
}
