// Derived from https://github.com/vercel/next.js/blob/canary/examples/with-apollo/lib/apolloClient.js
import { useMemo } from 'react';
import getConfig from 'next/config';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
let apolloClient;

const {
  publicRuntimeConfig: { serverUrl },
} = getConfig();

function createApolloClient(req) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createUploadLink({
      // TODO: server-side requests must have an absolute URI. We should find a way
      // to make this part of the project config, seems highly opinionated here
      uri: `${serverUrl}/api/graphql`,
      credentials: 'include', // Additional fetch() options like `credentials` or `headers`
      headers: req && req.headers,
    }),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null, req = null) {
  const _apolloClient = apolloClient ?? createApolloClient(req);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
