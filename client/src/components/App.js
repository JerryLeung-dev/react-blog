import React from 'react';
import {Route, Switch} from 'react-router-dom';

import About from './about';
import RegisterLogin from './RegisterLogin';
import Register from './RegisterLogin/register';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <Switch>
        {/* <Route path="/" component={Home}/> */}
        <Route path="/about" component={About}/> 
        <Route path="/login" component={RegisterLogin}/> 
        <Route path="/register" component={Register}/> 
        <Route path="/" component={Home}/> 
      </Switch>
    </div>
  );
}

export default App;
