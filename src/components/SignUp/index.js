import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import 'bootstrap/dist/css/bootstrap.min.css';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ThemeSwitcher from '../../constants/themeSwitcher';
import emailjs from 'emailjs-com';

const SignUpPage = () => (
  <div className="container text-center" style={{paddingTop: '60px'}}>
  <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    isRevealPassword: false,
  };

  class SignUpFormBase extends Component {
    constructor(props) {
      super(props);
      this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        const {user_email, passwordOne } = this.state;
        event.preventDefault();
        emailjs.sendForm('service_9hhua7x', 'template_45dk4o8', event.target, 'user_RkEbIsKPz6iCVdLWUW2yI')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
        this.props.firebase
          .doCreateUserWithEmailAndPassword(user_email, passwordOne)
          .then(authUser => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME);
          })
          .catch(error => {
            this.setState({ error });
          });

        event.preventDefault();
    }

    handleChangePassword = event => {
        this.setState({ isRevealPassword: !this.state.isRevealPassword })
    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            to_name,
            user_email,
            passwordOne,
            passwordTwo,
            error,
            isRevealPassword
        } = this.state;

        const isInvalid =
        passwordOne !== passwordTwo ||
        passwordOne === '' ||
        user_email === '' ||
        to_name === '';

        return (
            <form onSubmit={this.onSubmit}>
                <ThemeSwitcher />
                <FormControl
                  name="to_name"
                  value={to_name}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Full Name"
                  style={{marginBottom: '10px'}}
                  required
                />
                <FormControl
                  name="user_email"
                  value={user_email}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Email Address"
                  style={{marginBottom: '10px'}}
                  required
                />
                <InputGroup className="mb-3 text-center" >
                    <InputGroup.Prepend>
                        <InputGroup.Text onClick={this.handleChangePassword} ref={this.isRevealPassword}>{isRevealPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      name="passwordOne"
                      value={passwordOne}
                      onChange={this.onChange}
                      type={isRevealPassword ? 'text' : "password"}
                      placeholder="Password"
                      required
                    />
                </InputGroup>
                <InputGroup className="mb-3 text-center" >
                    <InputGroup.Prepend>
                        <InputGroup.Text id="password" onClick={this.handleChangePassword} ref={this.isRevealPassword}>{isRevealPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      name="passwordTwo"
                      value={passwordTwo}
                      onChange={this.onChange}
                      type={isRevealPassword ? 'text' : "password"}
                      placeholder="Confirm Password"
                    />
                </InputGroup>
                <Button disabled={isInvalid} type="submit">Sign Up</Button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignUpLink = () => (
  <p className="text-center">
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
    withRouter,
    withFirebase,
  )(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };