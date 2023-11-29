import { gql } from "graphql-request";

//getProfileUser
const HAS_MASTER = gql`
  query ProfileUsers($where: ProfileUserWhereInput!) {
    profileUsers(where: $where) {
      user {
        name
        id
        email
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
      education
    }
  }
`;

const PROFILE_USERS = gql`
  query ProfileUsers($orderBy: [ProfileUserOrderByInput!]!) {
    profileUsers(orderBy: $orderBy) {
      id
      
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
      user {
        name
        id
        email
        role
      }
      resume
      education
      experience {
        id
        title
      
        location_type
        location,
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
      education
    }
  }
`;

const VIEW_MASTER = gql`
  query ProfileUser($where: ProfileUserWhereUniqueInput!) {
    profileUser(where: $where) {
      user {
        name
        id
        email
      }
  
      resume_headline
      
      profile_summary
      photograph
      keyskillsCount
      keyskills {
        name
        id
      }
      itskills {
        name
        id
      }
      education
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
  
};
