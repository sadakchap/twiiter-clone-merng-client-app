import { gql, useQuery } from "@apollo/client";
import { Grid } from "semantic-ui-react";
import PostCard from "../components/PostCard";

const FETCH_POSTS_QUERY = gql`
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

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid stackable columns={3}>
      <Grid.Row>
        <h1>Recents Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts...</h1>
        ) : data.getPosts.length !== 0 ? (
          data.getPosts.map((post) => (
            <Grid.Column key={post.id}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        ) : (
          <h1>No recent post😣😣</h1>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
