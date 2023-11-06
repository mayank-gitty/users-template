//mutation queries
import { gql } from "graphql-request";


const updateUser = gql`
  mutation Mutation(
    $where: ProfileUserWhereUniqueInput!
    $data: ProfileUserUpdateInput!
  ) {
    updateProfileUser(where: $where, data: $data) {
      total_experience
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
          role
        }
        sessionToken
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;
const UPDATE_PASSWORD = gql`
mutation Mutation($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
  updateUser(where: $where, data: $data) {
    email
    
  }
}
`;


export {updateUser,AUTH_MUTATION,UPDATE_PASSWORD}