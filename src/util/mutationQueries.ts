//mutation queries
import { gql } from "graphql-request";

const updateUser = gql`
  mutation Mutation(
    $where: ProfileUserWhereUniqueInput!
    $data: ProfileUserUpdateInput!
  ) {
    updateProfileUser(where: $where, data: $data) {
      experience {
        title
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

const updateUserExperience = gql`
  mutation UpdateAddExperience(
    $where: AddExperienceWhereUniqueInput!
    $data: AddExperienceUpdateInput!
  ) {
    updateAddExperience(where: $where, data: $data) {
      id
      title
      employment_type
      company
      location
      location_type
      currently_working
      start_year
      start_year_month
      end_year
      end_year_month
    }
  }
`;

const deleteExperience = gql`
  mutation DeleteAddExperience($where: AddExperienceWhereUniqueInput!) {
    deleteAddExperience(where: $where) {
      employment_type
    }
  }
`;

export {
  updateUser,
  AUTH_MUTATION,
  UPDATE_PASSWORD,
  updateUserExperience,
  deleteExperience,
};
