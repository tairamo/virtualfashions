import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import GlobalStyle from "../styles";
import Home from "../Home";
import Profile from "../Profile";

function App() {
  return (
    <main>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/profile' exact component={Profile}/>
        </Switch>
      </Router>
    </main>
  );
}

export default App;
