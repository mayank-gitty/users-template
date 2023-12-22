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



const updateEmployeeBasicDetails = gql`
mutation Mutation($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
  updateUser(where: $where, data: $data) {
    email
    company {
      name
    }
    address
    phone
  }
}
`

const AUTH_MUTATION = gql`
  mutation signin($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          name
          email
          role
          company {
            name
          }
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


const updateUserProject = gql`
mutation Mutation($where: ProjectWhereUniqueInput!, $data: ProjectUpdateInput!) {
  updateProject(where: $where, data: $data) {
    id
    projectTitle
    client
    workFromYear
    workFromMonth
    projectStatus
    detailsOfProject
    projectSite
    projectLocation
    natureOfEmployment
    teamSize
    role
    roleDescription
    skillUsed
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


const deleteEducation = gql`
mutation DeleteAddEducation($where: AddEducationWhereUniqueInput!) {
  deleteAddEducation(where: $where) {
    school
  }
}
`;


const deleteProject = gql`
mutation DeleteProject($where: ProjectWhereUniqueInput!) {
  deleteProject(where: $where) {
    id
    projectTitle
    client
    workFromYear
    workFromMonth
    projectStatus
    detailsOfProject
    projectSite
    projectLocation
    natureOfEmployment
    teamSize
    role
    roleDescription
    skillUsed
  }
}
`

const updateUserEducation = gql`
  mutation UpdateAddEducation(
    $where: AddEducationWhereUniqueInput!
    $data: AddEducationUpdateInput!
  ) {
    updateAddEducation(where: $where, data: $data) {
      id
      school
      degree
      field_of_study
      grade
      activities
      description
      start_year
      start_year_month
      end_year
      end_year_month
    }
  }
`;

export {
  updateUser,
  AUTH_MUTATION,
  UPDATE_PASSWORD,
  updateUserExperience,
  updateUserEducation,
  deleteExperience,
  deleteEducation,
  updateUserProject,
  deleteProject ,
  updateEmployeeBasicDetails
};
