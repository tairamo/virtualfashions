import { HashRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyle from "../styles";
import Home from "../Home";
import Profile from "../Profile";
import EditProfile from "../Profile/EditProfile";
import Product from "../Product";

function App() {
  return (
    <main>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/edit" exact component={EditProfile} />
          <Route path="/product" exact component={Product} />
        </Switch>
      </Router>
    </main>
  );
}

export default App;
