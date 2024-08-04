import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { firstValueFrom, map } from "rxjs";
import { TopLosersGainers } from "../../graphql/generated-types";


const MARKET_TRENDS = gql<TopLosersGainers, { limit: number }>`
query MarketTrends($limit: Int!) {
  marketTrends(limit: $limit) {
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

const YODHA_TRENDS = gql<TopLosersGainers, { limit: number }>`
query YodhaTrends($limit: Int!) {
  yodhaTrends(limit: $limit) {
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
    onMarketTrends(limit = 5) {
        return firstValueFrom(this.apollo.query({
            query: MARKET_TRENDS,
            variables: {
                limit: limit
            }
        }).pipe(map(result => {
                console.log(result);
                return result;
            })
        ))
    }

    onYodhaTrends(limit = 5) {
        return firstValueFrom(this.apollo.query({
            query: YODHA_TRENDS,
            variables: {
                limit: limit
            }
        }).pipe(map(result => {
                console.log(result);
                return result;
            })
        ))
    }

}