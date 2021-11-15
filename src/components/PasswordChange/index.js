import React, { Component } from 'react';
import { Button, FormControl, Form } from 'react-bootstrap'
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { passwordOne } = this.state;

        this.props.firebase
            .doPasswordUpdate(passwordOne)
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
        const { passwordOne, passwordTwo, error } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo || passwordOne === '';
        if (this.props.mail === null) {
            return (
                <form onSubmit={this.onSubmit}>
                    <Form.Group controlId="Mdpchange">
                        <Form.Label controlId="Mdp1">Password Match System</Form.Label>
                        <FormControl
                            name="passwordOne"
                            value={passwordOne}
                            onChange={this.onChange}
                            type="password"
                            disabled
                            placeholder="New Password"
                        />
                        <FormControl
                            name="passwordTwo"
                            value={passwordTwo}
                            onChange={this.onChange}
                            type="password"
                            disabled
                            placeholder="Confirm New Password"
                        />
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
                <form onSubmit={this.onSubmit}>
                    <Form.Group controlId="Mdp">
                        <Form.Label controlId="Mdp1">Password Match System</Form.Label>
                        <FormControl
                            name="passwordOne"
                            value={passwordOne}
                            onChange={this.onChange}
                            type="password"
                            placeholder="New Password"
                        />
                        <FormControl
                            name="passwordTwo"
                            value={passwordTwo}
                            onChange={this.onChange}
                            type="password"
                            placeholder="Confirm New Password"
                        />
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

export default withFirebase(PasswordChangeForm);