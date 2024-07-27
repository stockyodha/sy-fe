import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { firstValueFrom, map } from "rxjs";
import { TopLosersGainers } from "../../graphql/generated-types";


const GAINERS_LOSERS = gql<TopLosersGainers, { limit: number }>`
query TopLoser($limit: Int!) {
    topLosersGainers(limit: $limit) {
      GainersNse {
        Symbol
        CompanyName
        Change
        Change
        PercentChange
      }
      GainersBse {
        Symbol
        CompanyName
        Change
        Change
        PercentChange
      }
      LosersNse {
        Symbol
        CompanyName
        Change
        Change
        PercentChange
      }
      LosersBse {
        Symbol
        CompanyName
        Change
        Change
        PercentChange
      }
    }
  }
  `

@Injectable({
    providedIn: 'root'
})
export class MarketService {
    constructor(private apollo: Apollo) { }
    onTopGainersLosers() {
        return firstValueFrom(this.apollo.query({
            query: GAINERS_LOSERS,
            variables: {
                limit: 10
            }
        }).pipe(map(result => {
                console.log(result);
                return result;
            })
        ))
    }

}