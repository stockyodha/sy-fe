import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApplicationConfig, inject } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { TokenService } from './shared/services/token.service';

const uri = 'http://localhost:8080/query'; // <-- add the URL of the GraphQL server here

export function apolloOptionsFactory(tokenService: TokenService): ApolloClientOptions<any> {
  const httpLink = inject(HttpLink);

  const authLink = setContext((_, { headers }) => {
    const token = tokenService.getToken();
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  return {
    link: authLink.concat(httpLink.create({ uri })),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
    },
  };
}

export const graphqlProvider: ApplicationConfig['providers'] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: (tokenService: TokenService) => apolloOptionsFactory(tokenService),
    deps: [TokenService],
  }
];
 
