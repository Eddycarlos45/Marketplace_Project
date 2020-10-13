import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

//Pages
import produtos from './pages/produtos/produtos';
import form from './pages/produtos/form';
import login from './pages/user/Login';
import signUp from './pages/user/Signup';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="container">
            <Switch>
              <Route exact path="/produtos" component={produtos} />
              <Route exact path="/produtos/form" component={form} />
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
