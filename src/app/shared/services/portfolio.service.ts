import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { firstValueFrom, map } from "rxjs";

const PORTFOLIO = gql`
query PortfolioByUser($userId: String!) {
  portfoliosByUser(userId: $userId) {
    portfolio {
      id
      createdAt
      updatedAt
      name
      description
    }
    investment
    return
    returnPercentage
  }
}
`;

@Injectable({
    providedIn: 'root',
})
export class PortfolioService {
    constructor(private readonly apollo: Apollo) { }

    onGetPortfolioByUser(userId: string) {
        // Call the portfoliosByUser query
        return firstValueFrom(this.apollo.query({
            query: PORTFOLIO,
            variables: {
                userId
            }
        }).pipe(
            map(result => {
                console.log(result);
                return result;
            })
        ))
    }
}
