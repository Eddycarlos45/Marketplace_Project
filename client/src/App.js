import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

//Pages
import produtos from './pages/produtos/produtos';
import form from './pages/produtos/form';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="container">
            <Switch>
              <Route exact path="/produtos" component={produtos} />
              <Route exact path="/produtos/form" component={form} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
export default App;
