import React, { Component, useState } from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap';
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../../constants/theme'
import { GlobalStyles } from '../../constants/style'
import Button from '@material-ui/core/Button';
import { Modal } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';


const ThemeSwitcher = (data) => {

    let actualtheme = localStorage.getItem('theme');
    if (!actualtheme)
        actualtheme = data.theme;
    let [theme, setTheme] = useState(actualtheme);
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    localStorage.setItem("theme", theme);
    data.props.firebase.db.collection("theme").doc(data.props.uid).set({ theme: theme });

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <>
                <GlobalStyles />
                <Button onClick={toggleTheme} variant="contained" color="primary">Toggle theme</Button>
                <p style={{ paddingTop: '10px' }}>Current theme: {theme}</p>
                <footer>
                </footer>
            </>
        </ThemeProvider>
    );
}

const data = {
    url: ''
}

function MyVerticallyCenteredModal(props) {
    function onChangeinput(event) {
        data.url = event.target.value;
    }
    function onSubmit(event) {
        props.data.firebase.db.collection("background").doc(props.data.uid).set({ selected: true, url: data.url }).then(function() {
            window.location.reload(true);
        });
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    URL background Settings
        </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TextField
                    id="outlined-helperText"
                    label="ULR of your image"
                    helperText="Please enjoye this feature"
                    variant="outlined"
                    style={{ width: "100%" }}
                    onChange={onChangeinput}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="contained" color="primary" onClick={onSubmit}>Save changes</Button>
                <Button variant="contained" color="secondary" onClick={props.onHide}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

function EditBG(props) {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>
            <Button variant="contained" color="primary" onClick={() => setModalShow(true)}>New background</Button>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => {
                    setModalShow(false)
                }}
                data={props.props}
            />
        </>
    );
}

class AccountPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: undefined,
            url: ''
        }
    }

    componentDidMount() {
        this.props.firebase.db.collection("background").doc(this.props.uid).get().then((result) => {
            if (result.exists) {
                this.setState({
                    selected: result.data().selected,
                    url: result.data().url
                })
            } else {
                this.props.firebase.db.collection("background").doc(this.props.uid).set({ selected: false, url: '' });
                this.setState({
                    selected: false,
                    url: ''
                })
            }
        });
    }

    handleSetBackground = () => {
        this.setState({ selected: false })
    }

    selectedIsBackgroundColor = () => {
        this.setState({ selected: false })
        this.props.firebase.db.collection("background").doc(this.props.uid).update({ selected: false });
    }
    selectedIsBackgroundImage = () => {
        this.setState({ selected: true })
        this.props.firebase.db.collection("background").doc(this.props.uid).update({ selected: true });
    }

    render() {
        return (
            <AuthUserContext.Consumer>
                {authUser => (
                    <div className="container text-center" style={{ paddingTop: '60px' }}>
                        <h2>Account: {authUser.email}</h2>
                        <h3 style={{ paddingTop: "20px" }}><b>Reset Your password using:</b></h3>
                        <Row>
                            <Col sm={6}>
                                <PasswordForgetForm mail={authUser.email}/>
                            </Col>
                            <Col sm={6}>
                                <PasswordChangeForm mail={authUser.email}/>
                            </Col>
                        </Row>
                        <br></br>
                        <ThemeSwitcher theme={"light"} props={this.props} />
                        Set your Home Background:
                        <Row>
                            <Col sm={6}>
                                <Button variant="contained" color="primary" onClick={this.selectedIsBackgroundColor}>Black and white background</Button>
                                {this.state.selected !== true ? <hr /> : ""}
                            </Col>
                            <Col sm={6}>
                                <Button variant="contained" color="primary" disabled={this.state.url && this.state.url.length > 1 ? false : true} onClick={this.selectedIsBackgroundImage}>Personnal background</Button>
                                {this.state.selected === true ? <hr /> : ""}

                            </Col>
                        </Row>
                        <EditBG props={this.props} />
                    </div>
                )}
            </AuthUserContext.Consumer>
        );
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);