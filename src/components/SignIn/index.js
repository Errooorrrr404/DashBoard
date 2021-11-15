import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import "../../css/SignIn.css"
import { InputGroup, FormControl, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import github from '../../assets/github-1.svg';
import google from '../../assets/google-icon.svg';
import facebook from '../../assets/facebook-2.svg';
import ThemeSwitcher from '../../constants/themeSwitcher';
import IconButton from '@material-ui/core/IconButton';


const SignInPage = () => (
    <div className="conatiner" style={{ width: '100%', paddingTop: '60px' }}>
        <h1 className="text-center">SignIn</h1>
        <SignInForm />
        <PasswordForgetLink />
        <SignUpLink />
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
    isRevealPassword: false,
    isEmpty: true
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
        this.password = React.createRef();
        this.login = React.createRef();
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    handleChangePassword = event => {
        this.setState({ isRevealPassword: !this.state.isRevealPassword })
    }

    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };
    signInWithGoogle = event => {
        this.props.firebase
            .signInWithGoogle()
            .then((res) => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };
    signInWithGitHub = event => {
        this.props.firebase
            .signInWithGitHub()
            .then((res) => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };
    signInWithFacebook = event => {
        this.props.firebase
            .signInWithFacebook()
            .then((res) => {
                this.setState({...INITIAL_STATE.email = res.user})
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        if (event.target.id === "email") {
            var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (event.target.value.match(mailformat))
                this.setState({ isEmpty: false })
            else
                this.setState({ isEmpty: true })
        }
    };

    render() {
        const { isRevealPassword, isEmpty } = this.state;
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <div className="container text-center">
                <ThemeSwitcher />
                <Row className="text-center">
                    <Col sm={6} style={{ width: 'auto', display: 'block', margin: 'auto' }}>
                        <form onSubmit={this.onSubmit}>
                            <InputGroup className="mb-3 text-center" >
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="login" ref={this.isEmpty}>{isEmpty ? <FontAwesomeIcon icon={faTimes} style={{ color: "red" }} /> : <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />}</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={this.onChange}
                                    type="text"
                                    placeholder="Email Address"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3 text-center" >
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="password" onClick={this.handleChangePassword} ref={this.isRevealPassword}>{isRevealPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    name="password"
                                    value={password}
                                    onChange={this.onChange}
                                    type={isRevealPassword ? 'text' : "password"}
                                    placeholder="Password"
                                />
                            </InputGroup>
                            {error && <p className="text-center">{error.message}</p>}
                            <Button className="btn btn-success" style={{ margin: "10px" }} disabled={isInvalid} type="submit">
                                Sign In
                        </Button>
                        </form>
                    </Col>
                    <Col sm={6} className="my-auto" style={{ paddingBottom: 75 }}>
                        <IconButton color="secondary" aria-label="add an alarm" onClick={this.signInWithGitHub}>
                            <img src={github} alt="Connection with Github" className="logo" />
                        </IconButton>
                        <IconButton color="secondary" aria-label="add an alarm" onClick={this.signInWithGoogle}>
                            <img src={google} alt="Connection with Github" className="logo" />
                        </IconButton>
                        <IconButton color="secondary" aria-label="add an alarm" onClick={this.signInWithFacebook}>
                            <img src={facebook} alt="Connection with Github" className="logo" />
                        </IconButton>
                    </Col>
                </Row>
            </div >
        );
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
