import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './login';
import Registration from './registration';

import SignupConfirm from './SignupConfirm';
import LoginConfirm from './Loginconfirmation';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/login' component={Login}></Route>
      <Route exact path='/registration' component={Registration}></Route>
      <Route exact path='/signupconfirmation' component={SignupConfirm}></Route>
      <Route exact path='/loginconfirmation' component={LoginConfirm}></Route>
      
    </Switch>
  );
}

export default Main;