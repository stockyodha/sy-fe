import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { firstValueFrom } from "rxjs";

const NEWS = gql`
query News($limit: Int!, $offset: Int!, $orderType: String!, $orderOn:String!) {
  news(limit: $limit, offset: $offset, orderType: $orderType, orderOn: $orderOn) {
    id
    createdAt
    updatedAt
    publishedAt
    title
    description
    url
    imageURL
    content
    source
    stocks
    isAnalyzed
  }
}`

@Injectable({
    providedIn: 'root'
})
export class NewsService {
    constructor(private apollo: Apollo) { }

    onPaginatedNews(limit: number, offset: number, orderType: string, orderOn: string) {
        return firstValueFrom(this.apollo.query({
            query: NEWS,
            variables: {
                limit: limit,
                offset: offset,
                orderType: orderType,
                orderOn: orderOn
            }
        }))
    }
}