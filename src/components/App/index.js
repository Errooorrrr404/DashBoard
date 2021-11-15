import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route, Switch
} from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import Error404 from '../Error';
import AddWidget from '../Widgets/Add';
import EditWidget from '../Widgets/Modify';
import About from '../About';
import Demo from '../Demo';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authUser: null,
        };
    }

    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(
            authUser => {
                authUser
                    ? this.setState({ authUser })
                    : this.setState({ authUser: null });
            },
        );
    }

    componentWillUnmount() {
        this.listener();
    }
    render() {
        return (
            <Router>
                <div>
                    <Navigation authUser={this.state.authUser} />
                    <hr />
                    <Switch>
                        <Route exact path={ROUTES.LANDING} component={LandingPage} />
                        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                        <Route path={ROUTES.HOME} component={HomePage} />
                        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                        <Route path={ROUTES.ADDWIDGET} component={AddWidget} />
                        <Route path={ROUTES.MODWIDGET} component={EditWidget} />
                        <Route path={ROUTES.ABOUT} component={About} />
                        <Route path={ROUTES.DEMO} component={Demo} />
                        <Route component={Error404} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default withAuthentication(App);
