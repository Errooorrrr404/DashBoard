import React, { Component } from 'react';
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal, Row, Col, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const Global_State = {
    widget: '',
    settings: {},
    position: '',
    isAdded: undefined,
    TypeOk: false,
    SettingsOk: false,
    radio: '',
    timestamp: 0,
    inputField: '',
    country: '',
    actu: '',
    toDisplay: 0
};

function UpdateSettings(props) {
    if (props.data.props.props === undefined)
        return;
    props.data.props.props.firebase.db.collection("data").doc(props.data.props.props.uid).get().then(result => {
        if (result.exists) {
            let res = result.data().data
            for (let i = 0; i < res.length; i++) {
                if (res[i].timestamp === Global_State.timestamp) {
                    res[i].nom = "Intra: " + Global_State.radio;
                    res[i].autolog = Global_State.inputField;
                    res[i].typeRecup = Global_State.radio;
                    res[i].position = Global_State.position;
                    break;
                }
            }
            props.data.props.props.firebase.db.collection("data").doc(props.data.props.props.uid).set({
                data: res,
            }).then(function () {
                console.log("Document successfully written!");
                window.location.reload(true);
            }).catch(function (error) {
                console.error("Error writing document: ", error);
            });
        }
    }).then(() => {
        // window.location.reload(true);
    })
}

function UpdateSettingsWeather(props) {
    if (props.data.props.props === undefined)
        return;
    props.data.props.props.firebase.db.collection("data").doc(props.data.props.props.uid).get().then(result => {
        if (result.exists) {
            let res = result.data().data
            for (let i = 0; i < res.length; i++) {
                if (res[i].timestamp === Global_State.timestamp) {
                    res[i].nom = "Weather: " + Global_State.inputField;
                    res[i].ville = Global_State.inputField;
                    res[i].position = Global_State.position;
                    break;
                }
            }
            props.data.props.props.firebase.db.collection("data").doc(props.data.props.props.uid).set({
                data: res,
            }).then(function () {
                console.log("Document successfully written!");
                window.location.reload(true);
            }).catch(function (error) {
                console.error("Error writing document: ", error);
            });
        }
    }).then(() => {
        // window.location.reload(false);
    })
}

function UpdateSettingsActu(props) {
    if (props.data.props.props === undefined)
        return;
    props.data.props.props.firebase.db.collection("data").doc(props.data.props.props.uid).get().then(result => {
        if (result.exists) {
            let res = result.data().data
            for (let i = 0; i < res.length; i++) {
                if (res[i].timestamp === Global_State.timestamp) {
                    res[i].nom = "Actuality: " + (Global_State.radio === "Top" ? "Top" : Global_State.actu);
                    res[i].country = Global_State.country;
                    res[i].position = Global_State.position;
                    res[i].type = (Global_State.radio === "Top" ? "Top" : Global_State.actu);
                    res[i].toDisplay = Global_State.toDisplay;
                    break;
                }
            }
            props.data.props.props.firebase.db.collection("data").doc(props.data.props.props.uid).set({
                data: res,
            }).then(function () {
                console.log("Document successfully written!");
                window.location.reload(true);
            }).catch(function (error) {
                console.error("Error writing document: ", error);
            });
        }
    }).then(() => {
        // window.location.reload(false);
    })
}

function UpdateSettingsSpotify(props) {
    if (props.data.props.props === undefined)
        return;
    props.data.props.props.firebase.db.collection("data").doc(props.data.props.props.uid).get().then(result => {
        if (result.exists) {
            let res = result.data().data
            for (let i = 0; i < res.length; i++) {
                if (res[i].timestamp === Global_State.timestamp) {
                    res[i].position = Global_State.position;
                    break;
                }
            }
            props.data.props.props.firebase.db.collection("data").doc(props.data.props.props.uid).set({
                data: res,
            }).then(function () {
                console.log("Document successfully written!");
                window.location.reload(true);
            }).catch(function (error) {
                console.error("Error writing document: ", error);
            });
        }
    }).then(() => {
        // window.location.reload(false);
    })
}

function UpdateSettingsTodo(props) {
    if (props.data.props.props === undefined)
        return;
    props.data.props.props.firebase.db.collection("data").doc(props.data.props.props.uid).get().then(result => {
        if (result.exists) {
            let res = result.data().data
            for (let i = 0; i < res.length; i++) {
                if (res[i].timestamp === Global_State.timestamp) {
                    res[i].position = Global_State.position;
                    res[i].nom = "TodoList: " + Global_State.inputField;
                    break;
                }
            }
            props.data.props.props.firebase.db.collection("data").doc(props.data.props.props.uid).set({
                data: res,
            }).then(function () {
                console.log("Document successfully written!");
                window.location.reload(true);
            }).catch(function (error) {
                console.error("Error writing document: ", error);
            });
        }
    }).then(() => {
        // window.location.reload(false);
    })
}

function RemoveWidget(props) {
    if (props.data.props.props === undefined)
        return;
    props.data.props.props.firebase.db.collection("data").doc(props.data.props.props.uid).get().then(result => {
        if (result.exists) {
            let res = result.data().data
            let data_push = [];
            for (let i = 0; i < res.length; i++) {
                if (res[i].timestamp !== Global_State.timestamp) {
                    data_push.push(res[i])
                }
            }
            props.data.props.props.firebase.db.collection("data").doc(props.data.props.props.uid).set({
                data: data_push,
            }).then(function () {
                console.log("Document successfully written!");
                window.location.reload(true);
            }).catch(function (error) {
                console.error("Error writing document: ", error);
            });
        }
    }).then(() => {
        // window.location.reload(false);
    })
}

class EditIntra extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...Global_State,
        };
    }

    onChangeInputIntraradio = (event) => {
        this.setState({ ...Global_State.radio = event.target.value })
        this.setState({ ...Global_State });
    };

    setPositionValue = (event) => {
        if (event.target.value === "left") {
            this.setState({
                ...Global_State.position = "left"
            });
            this.setState({ ...Global_State });
        } else if (event.target.value === "right") {
            this.setState({
                ...Global_State.position = "right"
            });
            this.setState({ ...Global_State });
        }
    }
    onChangeInputIntra = event => {
        this.setState({ ...Global_State.inputField = event.target.value })
        this.setState({ ...Global_State });
    };
    componentDidMount() {
        this.setState({
            ...Global_State.position = this.props.props.widget.position
        });
        this.setState({
            ...Global_State.radio = this.props.props.widget.typeRecup
        });
        this.setState({
            ...Global_State.inputField = this.props.props.widget.autolog
        });
        this.setState({
            ...Global_State.timestamp = this.props.props.widget.timestamp
        });
        this.setState({ ...Global_State });

    }

    render() {
        return <><Row className="text-center">
            <Col className="my-auto">
                inputField:
        </Col>
            <Col>
                <TextField
                    id="outlined-number"
                    label="inputField"
                    type="text"
                    variant="outlined"
                    value={this.state.inputField}
                    onChange={this.onChangeInputIntra}
                />
            </Col>
        </Row>
            <div className="container text-center">
                <FormControl component="fieldset">
                    <FormLabel component="legend"></FormLabel>
                    <RadioGroup aria-label="gender" name="infoIntra" value={this.state.radio} onChange={this.onChangeInputIntraradio}>
                        <FormControlLabel value="appointments" control={<Radio />} label="Upcoming appointments" />
                        <FormControlLabel value="notifications" control={<Radio />} label="Notification messages" />
                        <FormControlLabel value="GPAcredits" control={<Radio />} label="GPA and Credits number" />
                        <FormControlLabel value="all" control={<Radio />} label="all" />
                    </RadioGroup>
                </FormControl>
                <br />
                <ToggleButtonGroup type="checkbox" value={this.state.position} style={{ paddingTop: 10 }}>
                    <ToggleButton value={"left"} checked={this.state.position === "left"} onChange={this.setPositionValue}>Left</ToggleButton>
                    <ToggleButton value={"right"} checked={this.state.position === "right"} onChange={this.setPositionValue}>Right</ToggleButton>
                </ToggleButtonGroup>
            </div></>
    }
}

function EditIntraModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Widget: {props.data.props.widget.nom}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EditIntra props={props.data.props} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => UpdateSettings(props)} >Save changes</Button>
                <Button variant="danger" onClick={() => RemoveWidget(props)}>Delete this widget</Button>
            </Modal.Footer>
        </Modal>
    );
}

class EditWeather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...Global_State,
        };
    }

    setPositionValue = (event) => {
        if (event.target.value === "left") {
            this.setState({
                ...Global_State.position = "left"
            });
            this.setState({ ...Global_State });
        } else if (event.target.value === "right") {
            this.setState({
                ...Global_State.position = "right"
            });
            this.setState({ ...Global_State });
        }
    }
    onChangeInputIntra = event => {
        this.setState({ ...Global_State.inputField = event.target.value })
        this.setState({ ...Global_State });
    };
    componentDidMount() {
        this.setState({
            ...Global_State.position = this.props.props.widget.position
        });
        this.setState({
            ...Global_State.radio = this.props.props.widget.typeRecup
        });
        this.setState({
            ...Global_State.inputField = this.props.props.widget.ville
        });
        this.setState({
            ...Global_State.timestamp = this.props.props.widget.timestamp
        });
        this.setState({ ...Global_State });

    }

    render() {
        return <><Row className="text-center">
            <Col className="my-auto">
                City:
        </Col>
            <Col>
                <TextField
                    id="outlined-number"
                    label="City"
                    type="text"
                    variant="outlined"
                    value={this.state.inputField}
                    onChange={this.onChangeInputIntra}
                />
            </Col>
        </Row>
            <div className="container text-center">
                <ToggleButtonGroup type="checkbox" value={this.state.position} style={{ paddingTop: 10 }}>
                    <ToggleButton value={"left"} checked={this.state.position === "left"} onChange={this.setPositionValue}>Left</ToggleButton>
                    <ToggleButton value={"right"} checked={this.state.position === "right"} onChange={this.setPositionValue}>Right</ToggleButton>
                </ToggleButtonGroup>
            </div></>
    }
}

function EditWeatherModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Widget: {props.data.props.widget.nom}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EditWeather props={props.data.props} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => UpdateSettingsWeather(props)} >Save changes</Button>
                <Button variant="danger" onClick={() => RemoveWidget(props)}>Delete this widget</Button>
            </Modal.Footer>
        </Modal>
    );
}

class EditActu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...Global_State,
            toDisplayError: false,
        };
    }

    setPositionValue = (event) => {
        if (event.target.value === "left") {
            this.setState({
                ...Global_State.position = "left"
            });
            this.setState({ ...Global_State });
        } else if (event.target.value === "right") {
            this.setState({
                ...Global_State.position = "right"
            });
            this.setState({ ...Global_State });
        }
    }

    componentDidMount() {
        this.setState({
            ...Global_State.position = this.props.props.widget.position
        });
        this.setState({
            ...Global_State.radio = (this.props.props.widget.type === "Top" ? "Top" : "Section"),
            ...Global_State.actu = (this.props.props.widget.type === "Top" ? "" : this.props.props.widget.type)
        });
        this.setState({
            ...Global_State.timestamp = this.props.props.widget.timestamp
        });
        this.setState({
            ...Global_State.country = this.props.props.widget.country
        });
        this.setState({
            ...Global_State.toDisplay = this.props.props.widget.toDisplay
        });
        this.setState({ ...Global_State });

    }
    onChangeInputradio = (event) => {
        this.setState({ radio: event.target.value })
        this.setState({
            ...Global_State.radio = event.target.value
        });
    };
    onChangeCountry = (event) => {
        this.setState({ country: event.target.value })
        this.setState({
            ...Global_State.country = event.target.value
        });
    }

    onChangeKeyWord = (event) => {
        this.setState({
            ...Global_State.actu = event.target.value
        });
    }

    onChangeNumberArticles = (event) => {
        if (isNaN(event.target.value) || parseInt(event.target.value) <= 0) {
            this.setState({
                ...Global_State.toDisplayError = true,
                toDisplayError: true
            });
        } else {
            this.setState({
                toDisplay: event.target.value,
                toDisplayError: false
            })
            this.setState({
                ...Global_State.toDisplay = event.target.value,
                ...Global_State.toDisplayError = false
            });
        }
    }

    render() {
        return (<>
            <div className="text-center">
                <Row>
                    <Col>
                        <FormControl component="fieldset">
                            <FormLabel component="legend"></FormLabel>
                            <RadioGroup aria-label="gender" name="infoIntra" value={this.state.radio} onChange={this.onChangeInputradio}>
                                <FormControlLabel value="Top" control={<Radio />} label="Top headlines" />
                                <FormControlLabel value="Section" control={<Radio />} label={<TextField label="Key Word" variant="outlined" value={Global_State.actu} onChange={this.onChangeKeyWord} onClick={() => this.setState({ radio: "Section", ...Global_State.radio = "Section" })} />} />
                            </RadioGroup>
                        </FormControl>
                    </Col>
                    <Col>
                        <FormControl component="fieldset">
                            <FormLabel component="legend"></FormLabel>
                            <RadioGroup aria-label="gender" name="infoIntra" value={this.state.country} onChange={this.onChangeCountry}>
                                <FormControlLabel value="fr" control={<Radio />} label="French" />
                                <FormControlLabel value="en" control={<Radio />} label="English" />
                            </RadioGroup>
                        </FormControl>
                    </Col>
                </Row>
                <br />
                <p>Number of articles to display:</p>
                <form noValidate autoComplete="off">
                    <TextField error={this.state.toDisplayError} id="outlined-basic" value={Global_State.toDisplay} label="Number of articles" variant="outlined" onChange={this.onChangeNumberArticles} />
                </form>
                <br />
                <ToggleButtonGroup type="checkbox" value={this.state.position}>
                    <ToggleButton value={"left"} checked={this.state.position === "left"} onChange={(e) => this.setPositionValue(e.currentTarget.value)}>Left</ToggleButton>
                    <ToggleButton value={"right"} checked={this.state.position === "right"} onChange={(e) => this.setPositionValue(e.currentTarget.value)}>Right</ToggleButton>
                </ToggleButtonGroup>
            </div>
        </>
        )
    }
}

function EditActuModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Widget: {props.data.props.widget.nom}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EditActu props={props.data.props} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => UpdateSettingsActu(props)} >Save changes</Button>
                <Button variant="danger" onClick={() => RemoveWidget(props)}>Delete this widget</Button>
            </Modal.Footer>
        </Modal>
    );
}

class EditSpotify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...Global_State,
        };
    }

    setPositionValue = (event) => {
        if (event.target.value === "left") {
            this.setState({
                ...Global_State.position = "left"
            });
            this.setState({ ...Global_State });
        } else if (event.target.value === "right") {
            this.setState({
                ...Global_State.position = "right"
            });
            this.setState({ ...Global_State });
        }
    }
    componentDidMount() {
        this.setState({
            ...Global_State.position = this.props.props.widget.position
        });
        this.setState({
            ...Global_State.timestamp = this.props.props.widget.timestamp
        });
        this.setState({ ...Global_State });
    }

    render() {
        return <>
            <div className="container text-center">
                <ToggleButtonGroup type="checkbox" value={this.state.position} style={{ paddingTop: 10 }}>
                    <ToggleButton value={"left"} checked={this.state.position === "left"} onChange={this.setPositionValue}>Left</ToggleButton>
                    <ToggleButton value={"right"} checked={this.state.position === "right"} onChange={this.setPositionValue}>Right</ToggleButton>
                </ToggleButtonGroup>
            </div>
        </>
    }
}

function EditSpotifyModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Widget: {props.data.props.widget.nom}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EditSpotify props={props.data.props} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => UpdateSettingsSpotify(props)} >Save changes</Button>
                <Button variant="danger" onClick={() => RemoveWidget(props)}>Delete this widget</Button>
            </Modal.Footer>
        </Modal>
    );
}

class EditTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...Global_State,
        };
    }

    setPositionValue = (event) => {
        if (event.target.value === "left") {
            this.setState({
                ...Global_State.position = "left"
            });
            this.setState({ ...Global_State });
        } else if (event.target.value === "right") {
            this.setState({
                ...Global_State.position = "right"
            });
            this.setState({ ...Global_State });
        }
    }
    onChangeInput = event => {
        this.setState({ ...Global_State.inputField = event.target.value })
        this.setState({ ...Global_State });
    };
    componentDidMount() {
        this.setState({
            ...Global_State.position = this.props.props.widget.position
        });
        this.setState({
            ...Global_State.inputField = this.props.props.widget.nom.substr(10)
        });
        this.setState({
            ...Global_State.timestamp = this.props.props.widget.timestamp
        });
        this.setState({ ...Global_State });
    }

    render() {
        return <><Row className="text-center">
            <Col className="my-auto">
                title of your List:
        </Col>
            <Col>
                <TextField
                    id="outlined-number"
                    label="Title"
                    type="text"
                    variant="outlined"
                    value={this.state.inputField}
                    onChange={this.onChangeInput}
                />
            </Col>
        </Row>
            <div className="container text-center">
                <ToggleButtonGroup type="checkbox" value={this.state.position} style={{ paddingTop: 10 }}>
                    <ToggleButton value={"left"} checked={this.state.position === "left"} onChange={this.setPositionValue}>Left</ToggleButton>
                    <ToggleButton value={"right"} checked={this.state.position === "right"} onChange={this.setPositionValue}>Right</ToggleButton>
                </ToggleButtonGroup>
            </div></>
    }
}

function EditTodoModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Widget: {props.data.props.widget.nom}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EditTodo props={props.data.props} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => UpdateSettingsTodo(props)} >Save changes</Button>
                <Button variant="danger" onClick={() => RemoveWidget(props)}>Delete this widget</Button>
            </Modal.Footer>
        </Modal>
    );
}

function ModalEditWidget(data) {
    const [modalShow, setModalShow] = React.useState(false);
    switch (data.data.props.widget.widget.toLowerCase()) {
        case "intra":
            return (
                <>
                    <FontAwesomeIcon className="float-sm-right" icon={faCog} style={{ fontSize: "22px", cursor: "pointer" }} onClick={() => setModalShow(true)} />
                    <EditIntraModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        data={data.data}
                    />
                </>
            );
        case 'weather':
            return (
                <>
                    <FontAwesomeIcon className="float-sm-right" icon={faCog} style={{ fontSize: "22px", cursor: "pointer" }} onClick={() => setModalShow(true)} />
                    <EditWeatherModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        data={data.data}
                    />
                </>
            );
        case 'actuality':
            return (
                <>
                    <FontAwesomeIcon className="float-sm-right" icon={faCog} style={{ fontSize: "22px", cursor: "pointer" }} onClick={() => setModalShow(true)} />
                    <EditActuModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        data={data.data}
                    />
                </>
            );
        case 'spotify':
            return (
                <>
                    <FontAwesomeIcon className="float-sm-right" icon={faCog} style={{ fontSize: "22px", cursor: "pointer" }} onClick={() => setModalShow(true)} />
                    <EditSpotifyModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        data={data.data}
                    />
                </>
            );
            case 'todo':
                return (
                    <>
                        <FontAwesomeIcon className="float-sm-right" icon={faCog} style={{ fontSize: "22px", cursor: "pointer" }} onClick={() => setModalShow(true)} />
                        <EditTodoModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            data={data.data}
                        />
                    </>
                );
        default:
            return (<></>)
    }
}

class EditWidget extends Component {

    render() {
        return <ModalEditWidget data={this} />
    }
}

export default EditWidget;