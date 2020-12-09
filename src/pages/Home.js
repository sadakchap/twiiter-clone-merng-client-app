import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import { AuthContext } from "../context/authContext";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid stackable columns={3}>
      <Grid.Row>
        <h1>Recents Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}

        {loading ? (
          <h1>Loading posts...</h1>
        ) : data.getPosts.length !== 0 ? (
          <Transition.Group>
            {data.getPosts.map((post) => (
              <Grid.Column key={post.id} style={{marginBottom: '1rem'}}>
                <PostCard post={post} />
              </Grid.Column>
            ))}
          </Transition.Group>
        ) : (
          <h1>No recent post😣😣</h1>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
