import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../src/utils/auth'
import './App.css';

//Pages
import produtos from './pages/produtos/produtos';
import form from './pages/produtos/form';
import login from './pages/user/Login';
import signUp from './pages/user/Signup';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
    }
  />
)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="container">
            <Switch>
              <PrivateRoute exact path="/produtos" component={produtos} />
              <PrivateRoute exact path="/produtos/form" component={form} />
              <Route exact path="/" component={login} />
              <Route exact path="/signup" component={signUp} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
export default App;
