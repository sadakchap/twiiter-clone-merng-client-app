import { gql } from "@apollo/client";

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      username
      createdAt
      likesCount
      commentsCount
      likes {
        username
      }
      comments {
        body
        username
      }
    }
  }
`;
