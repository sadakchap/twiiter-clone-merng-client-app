import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import AuthRoute from "./components/AuthRoute";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/authContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";

function App() {
  return (
    <AuthProvider>
      <Container>
        <Router>
          <Navbar />
          <Route path="/" exact component={Home} />
          <AuthRoute path="/login" exact component={Login} />
          <AuthRoute path="/register" exact component={Register} />
          <Route path="/posts/:postId" exact component={SinglePost} />
        </Router>
      </Container>
    </AuthProvider>
  );
}

export default App;
