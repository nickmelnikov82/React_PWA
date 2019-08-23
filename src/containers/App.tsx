import React from 'react';

import {
  Route,
  Redirect,
  Switch,
  RouteComponentProps,
  RouteProps
} from "react-router-dom";

import { connect } from 'react-redux';
import { StoreType } from '../store/types';

import Login from './Login';
import Account from './Account';
import Page404 from '../components/Page404';

const PrivateRoute : React.SFC<RouteProps & any> =
  ({ component: Component, auth, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props : RouteComponentProps<any>) => auth
          ? <Component {...props} isAuth={auth} />
          : <Redirect to='/login' />}
      />
    );
};

const LoginRoute : React.SFC<RouteProps & any> =
  ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props : RouteComponentProps<any>) => auth
        ? <Redirect to='/' />
        : <Component {...props} />}
    />
  );
};

interface Props {
  isAuth : boolean;
};

interface State {
  isAuth : boolean;
};

class App extends React.Component<Props, State> {

  public state : State = {
    isAuth: false,
  };

  public static getDerivedStateFromProps = (nextProps : Props, prevState : State) => ({
    isAuth: nextProps.isAuth,
  });

  public componentDidMount() : void {
    // for test
  }

  public render() {
    const { isAuth } = this.state;

    return (
      <Switch>
        <LoginRoute path="/login" auth={ isAuth } component={ Login } />
        <PrivateRoute exact path="/" auth={ isAuth } component={ Account } />
        <Route component={ Page404 } />
      </Switch>
    );
  }
};

const mapStateToProps = (state : StoreType) : State => ({
  isAuth: state.rootReducer.auth.isAuth,
});

export default connect(mapStateToProps, null)(App);
