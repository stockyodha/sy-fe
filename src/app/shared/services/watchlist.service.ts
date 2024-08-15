import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { firstValueFrom } from "rxjs";

const ADD_WATCHLIST = gql`
mutation AddWatchlist($stockId: String!) {
  addWatchlist(stockId: $stockId) {
    id
    createdAt
    updatedAt
    stocks{
        id
        createdAt
        updatedAt
        name
        description
        symbol
        industry
        sentiment
        exchange
    }
  }
}`;

const REMOVE_WATCHLIST = gql`
mutation RemoveWatchlist($stockId: String!) {
  removeWatchlist(stockId: $stockId) {
    id
    createdAt
    updatedAt
    stocks {
        id
        createdAt
        updatedAt
        name
        description
        symbol
        industry
        sentiment
        exchange
    }
  }
}
`;

const WATCHLIST = gql`
query Watchlist {
  watchlist {
    id
    createdAt
    updatedAt
    name
    description
    symbol
    industry
    sentiment
    exchange
  }
}
`;

@Injectable({
    providedIn: "root"
})
export class WatchlistService {
    constructor(private apollo: Apollo) {}

    addWatchlist(stockId: string) {
        return firstValueFrom(this.apollo.mutate({
            mutation: ADD_WATCHLIST,
            variables: {
                stockId
            }
        }));
    }

    removeWatchlist(stockId: string) {
        return firstValueFrom(this.apollo.mutate({
            mutation: REMOVE_WATCHLIST,
            variables: {
                stockId
            }
        }));
    }

    getWatchlist() {
        return firstValueFrom(this.apollo.query({
            query: WATCHLIST
        }));
    }
}