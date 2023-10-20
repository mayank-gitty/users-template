import React, { createContext, useContext, useState } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import gql from "graphql-tag";
// import { MERGE_LOCAL_CART } from '../gql/cart';

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  signin: Function;
  signout: Function;
  user: any;
  setUser: Function;
  userModal: any;
  setUserModal: Function;
  newLoading: boolean;
  setNewLoading: Function;
};
export const AuthContext = createContext<AuthContextType>({});

export const useAuth = () => useContext(AuthContext);

const userFragment = `
  id
  name
  role
  email
  phone
  image{
    url
  }
  gender
  isVerifiedEmail
  cart {
    id
    itemsCount
  }
  addresses {
    name
    address1
    address2
    postcode
    phone 
    landmark
    city
    state
    id   
    immutable
    type

}
`;

const USER_QUERY = gql`
  query USER_QUERY{
    authenticatedItem {
      ... on User {
       ${userFragment}
      }
    }
  }
`;

const AUTH_MUTATION = gql`
  mutation signin($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          name
          email
          phone
        }
        sessionToken
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

const UNAUTH_MUTATION = gql`
  mutation {
    endSession
  }
`;

export const AuthProvider = ({ children }:any) => {
  const [user, setUser] = useState(null);
  const [newLoading, setNewLoading] = useState(true);
  const [userModal, setUserModal] = useState(false);

  const client = useApolloClient();

  const {
    data: userData,
    loading: userLoading,
    refetch: userRefetch,
  } = useQuery(USER_QUERY, {
    fetchPolicy: "no-cache",
    onCompleted: ({ authenticatedItem, error }) => {
      if (error) {
        throw error;
      }
      setUser(authenticatedItem);

      setNewLoading(false);
    },
    onError: console.error,
  });

  // const [mergeLocalCart, { loading: merging }] = useMutation(MERGE_LOCAL_CART, {
  //   refetchQueries: ['GET_CART']
  // });

  const [signin, { loading: authLoading }] = useMutation(AUTH_MUTATION, {
    onCompleted: async ({
      authenticateUserWithPassword: {
        item = null,
        message = null,
        __typename = null,
      } = {},
      error,
    }) => {
      if (error) {
        setNewLoading(false);
        throw error;
      }

      await client.resetStore();

      if (message && __typename === "UserAuthenticationWithPasswordFailure") {
        setNewLoading(false);
        return;
      }
      if (item) {
        userRefetch();
        // await setUser(item);
        try {
          let localCart = JSON.parse(localStorage.getItem("cart"));
          if (localCart) {
            const items = localCart
              .filter((c) => c.product?.id && c.quantity)
              .map((c) => ({ productId: c.product.id, count: c.quantity }));
            // (items);
            if (items.length)
              await mergeLocalCart({
                variables: {
                  items,
                },
              });
          }

          localStorage.removeItem("cart");
        } catch (error) {
        }
      }
      setNewLoading(false);
    },
    onError: console.error,
  });

  const [signout, { loading: unauthLoading }] = useMutation(UNAUTH_MUTATION, {
    onCompleted: async ({ endSession, error }) => {
      if (error) {
        throw error;
      }
      await client.resetStore();

      if (endSession) {
        setUser(null);
      }
    },
    onError: console.error,
  });

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        isLoading: userLoading || authLoading || unauthLoading,
        signin,
        signout,
        user,
        setUser,
        userModal,
        setUserModal,
        newLoading,
        setNewLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
