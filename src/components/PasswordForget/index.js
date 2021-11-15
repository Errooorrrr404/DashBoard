import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap'
import ThemeSwitcher from '../../constants/themeSwitcher';

const PasswordForgetPage = () => (
    <div className="container text-center" style={{ paddingTop: '60px' }}>
        <h1 className="container text-center">PasswordForget</h1>
        <PasswordForgetForm />
    </div>
);

const INITIAL_STATE = {
    email: '',
    error: null,
};

class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email } = this.state;
        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, error } = this.state;

        const isInvalid = email === '';
        if (this.props.mail === null) {
            return (
                <form onSubmit={this.onSubmit} className="container text-center">
                    <ThemeSwitcher />
                    <Form.Group controlId="ResetByMail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            type="text"
                            disabled
                            placeholder="Email Address" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Button className="btn-success" disabled={isInvalid} type="submit">
                        Reset My Password
                    </Button>
                    {error && <p>{error.message}</p>}
                </form>

            );
        } else {
            return (
                <form onSubmit={this.onSubmit} className="container text-center">
                    <ThemeSwitcher />
                    <Form.Group controlId="ResetByMail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            type="text"
                            placeholder="Email Address" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Button className="btn-success" disabled={isInvalid} type="submit">
                        Reset My Password
                    </Button>
                    {error && <p>{error.message}</p>}
                </form>

            );
        }
    }
}

const PasswordForgetLink = () => (
    <p className="text-center">
        <Link to={ROUTES.PASSWORD_FORGET} className="text-center">Forgot Password?</Link>
    </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
