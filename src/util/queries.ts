import { gql } from "graphql-request";

//getProfileUser
const HAS_MASTER = gql`
  query ProfileUsers($where: ProfileUserWhereInput!) {
    profileUsers(where: $where) {
      user {
        name
        id
        email
        role
        company {
          name
        }
      }
      project {
        id
      }
      resume_headline
      profile_summary
      photograph
      keyskillsCount
      active
      open_to_work
      keyskills {
        name
        id
      }
      itskills {
        name
        id
      }
      education {
        id
      }
    }
  }
`;

const PROFILE_USERS = gql`
  query ProfileUsers( $where: ProfileUserWhereInput! , $orderBy: [ProfileUserOrderByInput!]!) {
    profileUsers( where: $where,orderBy: $orderBy) {
      id
      project {
        id
        projectTitle
        client
        workFromYear
        workFromMonth
        projectStatus
        projectSite
        projectLocation
        natureOfEmployment
        teamSize
        role
        roleDescription
        skillUsed
        detailsOfProject
      }

      resume_headline

      profile_summary
      keyskillsCount
      user {
        name
        company {
          name
        }
      }

      keyskills {
        name
      }
      photograph
      itskillsCount
      resume
      itskills {
        name
      }
    }
  }
`;

const PROFILE_USER = gql`
  query ProfileUsers($where: ProfileUserWhereInput!) {
    profileUsers(where: $where) {
      id
      project {
        id
        projectTitle
        client
        workFromYear
        workFromMonth
        projectStatus
        projectSite
        projectLocation
        natureOfEmployment
        teamSize
        role
        roleDescription
        detailsOfProject
        skillUsed
      }

      user {
        name
        id
        email
        role
        phone
        address

        company  {
          name
        }
      }
      resume
      education {
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
      experience {
        id
        title
        location_type
        location
        start_year
        start_year_month
        end_year
        end_year_month
        employment_type
        currently_working
        company

      }

      resume_headline
      profile_summary
      photograph
      keyskillsCount
      active
      open_to_work
      keyskills {
        name
        id
      }
      itskills {
        name
        id
      }
    }
  }
`;

const IT_SKILLS = gql`
  query ItSkills {
    itSkills {
      name
      id
    }
  }
`;

// Define mutation
const KEY_SKILLS = gql`
  query KeySkills {
    keySkills {
      name
      id
    }
  }
`;

const EDIT_MASTER = gql`
  query ProfileUser($where: ProfileUserWhereUniqueInput!) {
    profileUser(where: $where) {
      user {
        name
        id
        email
        phone
        address
        company {
          name
        }
      }

      resume_headline

      profile_summary
      photograph
      keyskillsCount
      active
      open_to_work
      keyskills {
        name
        id
      }
      itskills {
        name
        id
      }
      project {
        id
        projectTitle
        client
        workFromYear
        workFromMonth
        projectStatus
        projectSite
        projectLocation
        natureOfEmployment
        teamSize
        role
        roleDescription
        detailsOfProject
        skillUsed
      }

      education {
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

      experience {
        id
        title
        location_type
        location
        start_year
        start_year_month  
        end_year
        end_year_month
        employment_type
        currently_working
      }

    }
  }
`;



const VIEW_USER = gql`

query Query($where: UserWhereUniqueInput!) {
  user(where: $where) {
    id
    name
    email
    password {
      isSet
    }
    company {
      name
      id
    }
    createdAt
    address
    phone
    role
    photograph
    resume
    resume_headline
    itskills {
      id
      name
    }
    itskillsCount
    education {
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
    educationCount
    project {
      id
      projectTitle
      detailsOfProject
      client
      workFromYear
      workFromMonth
      projectStatus
      projectSite
      projectLocation
      natureOfEmployment
      teamSize
      role
      roleDescription
      skillUsed
    }
    projectCount
    active
    open_to_work
    keyskills {
      id
      name
    }
    keyskillsCount

    experience {
      id
      title
      location_type
      location
      start_year
      start_year_month  
      end_year
      end_year_month
      employment_type
      currently_working
      company
    }
    experienceCount
    profile_summary
  }
}


`

const VIEW_MASTER = gql`
  query ProfileUser($where: ProfileUserWhereUniqueInput!) {
    profileUser(where: $where) {
      user {
        name
        id
        email
        phone
        address
        company {
          name
          id
        }
      }

      experience {
        id
        title
        location_type
        location
        start_year
        start_year_month  
        end_year
        end_year_month
        employment_type
        currently_working
        company
      }

      resume_headline
      profile_summary
      photograph
      keyskillsCount
      active
      open_to_work
      keyskills {
        name
        id
      }
      itskills {
        name
        id
      }
      education {
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

      project {
        id
        projectTitle
        detailsOfProject
        client
        workFromYear
        workFromMonth
        projectStatus
        projectSite
        projectLocation
        natureOfEmployment
        teamSize
        role
        roleDescription
        skillUsed
      }

      resume
    }
  }
`;

const GET_USER = gql`
  query Query($where: UserWhereUniqueInput!) {
    user(where: $where) {
      role
      name
      email
      company {
        name
      }
    }
  }
`;

export {
  HAS_MASTER,
  PROFILE_USER,
  IT_SKILLS,
  KEY_SKILLS,
  EDIT_MASTER,
  VIEW_MASTER,
  PROFILE_USERS,
  GET_USER,
  VIEW_USER
};
