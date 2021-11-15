import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withAuthorization, AuthUserContext } from '../../Session';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, ToggleButtonGroup, ToggleButton, Alert, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import ThemeSwitcher from '../../../constants/themeSwitcher';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
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
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    reset: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        backgroundColor: "red"
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));

function getSteps() {
    return ['Which widget do you want to add ?', 'Widget Settings', 'Confirm Setting'];
}

class SetNewWidgets extends Component {
    constructor(props) {
        super(props);
        this.state = { ...Global_State };
    }
    onChange = event => {
        this.setState({ ...Global_State.widget = event.target.value });
        this.setState({ ...Global_State.TypeOk = true });
        Global_State.TypeOk = true;
    };

    render() {
        return (
            <Form.Control as="select" onChange={this.onChange} defaultValue={Global_State.widget}>
                <option disabled value="">Click me</option>
                <option value="Actuality">Actuality</option>
                <option value="Intra">Epitech Intra</option>
                <option value="Spotify">Spotify</option>
                <option value="Todo">ToDo list</option>
                <option value="Weather">Weather</option>
            </Form.Control>
        );
    }
};

class ConfigNewWidgets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...Global_State,
            Data: {
                "list": [],
            },
            autologinLink: '',
            radio: ''
        };
    }

    onChangeInputWeather = (event, value) => {
        if (event.target.value.length <= 3) {
            this.setState({
                Data: {
                    "list": [],
                }
            });
            return;
        }
        fetch('https://api.openweathermap.org/data/2.5/find?q=' + event.target.value + '&units=metric&appid=470a6fd7c4194bdb9e624ed71370546b')
            .then(response => response.json())
            .then(data => this.setState({ Data: data }))
            .then(this.setState({ ...Global_State.settings.city = event.target.value }));
    };

    onChangeInputIntra = (event) => {
        this.setState({ autologinLink: event.target.value })
        this.setState({
            ...Global_State.settings.autolog = event.target.value
        });
    };
    onChangeInputIntraradio = (event) => {
        this.setState({ radio: event.target.value })
        this.setState({
            ...Global_State.settings.typeRecup = event.target.value
        });
    };
    onChangeCountry = (event) => {
        this.setState({ country: event.target.value })
        this.setState({
            ...Global_State.settings.country = event.target.value
        });
    }

    onChangeKeyWord = (event) => {
        this.setState({ typeRecup: event.target.value })
        this.setState({
            ...Global_State.settings.typeRecup = event.target.value
        });
    }

    onChangeTodoKeyWord = (event) => {
        this.setState({ nom: event.target.value })
        this.setState({
            ...Global_State.nom = event.target.value
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
                toDisplay: parseInt(event.target.value),
                toDisplayError: false
            })
            this.setState({
                ...Global_State.toDisplay = parseInt(event.target.value),
                ...Global_State.toDisplayError = false
            });
        }
    }

    setPositionValue(pos) {
        this.setState({
            ...Global_State.TypeOk = true
        });
        if (pos === "left") {
            this.setState({
                ...Global_State.position = "left"
            });
            this.setState({ ...Global_State });

        } else if (pos === "right") {
            this.setState({
                ...Global_State.position = "right"
            });
            this.setState({ ...Global_State });
        }
        if (!this.state.toDisplayError) {
            this.setState({
                ...Global_State.SettingsOk = true
            });
        } else {
            this.setState({
                ...Global_State.SettingsOk = false
            });
        }
    }

    changeSelectedCity(value) {
        this.setState({ ...Global_State.settings.id = value.id });
    }

    render() {
        if (this.state.widget === "Weather") {
            return (<>
                <p>Configuration of your Weather Widget:</p>
                <Autocomplete
                    id="combo-box-demo"
                    options={this.state.Data.list}
                    getOptionLabel={(option) => option.name + " " + option.sys.country + " [" + option.coord.lat + ", " + option.coord.lon + "]"}
                    style={{ width: 250, display: "block", margin: "auto" }}
                    onChange={(event, value) => { this.changeSelectedCity(value) }}
                    renderInput={(params) => <TextField {...params} label="City" variant="outlined" onChange={this.onChangeInputWeather} />}
                />
                <ToggleButtonGroup type="checkbox" value={this.state.position} style={{ paddingTop: 10 }}>
                    <ToggleButton value={"left"} checked={this.state.position === "left"} onChange={(e) => this.setPositionValue(e.currentTarget.value)}>Left</ToggleButton>
                    <ToggleButton value={"right"} checked={this.state.position === "right"} onChange={(e) => this.setPositionValue(e.currentTarget.value)}>Right</ToggleButton>
                </ToggleButtonGroup>
                <br />
            </>
            );
        } else if (this.state.widget === "Intra") {
            return (<>
                <p>Intra</p>
                <TextField label="Autologin Link" variant="outlined" onChange={this.onChangeInputIntra} value={this.state.autologinLink} />
                <br />
                <FormControl component="fieldset">
                    <FormLabel component="legend"></FormLabel>
                    <RadioGroup aria-label="typeIntra" name="infoIntra" value={this.state.radio} onChange={this.onChangeInputIntraradio}>
                        <FormControlLabel value="appointments" control={<Radio />} label="Upcoming appointments" />
                        <FormControlLabel value="notifications" control={<Radio />} label="Notification messages" />
                        <FormControlLabel value="GPAcredits" control={<Radio />} label="GPA and Credits number" />
                        <FormControlLabel value="all" control={<Radio />} label="all" />
                    </RadioGroup>
                </FormControl>
                <br />
                <ToggleButtonGroup type="checkbox" value={this.state.position} style={{ paddingTop: 10 }}>
                    <ToggleButton value={"left"} checked={this.state.position === "left"} onChange={(e) => this.setPositionValue(e.currentTarget.value)}>Left</ToggleButton>
                    <ToggleButton value={"right"} checked={this.state.position === "right"} onChange={(e) => this.setPositionValue(e.currentTarget.value)}>Right</ToggleButton>
                </ToggleButtonGroup>
            </>
            );
        } else if (this.state.widget === "Spotify") {
            return (<>
                <ToggleButtonGroup type="checkbox" value={this.state.position}>
                    <ToggleButton value={"left"} checked={this.state.position === "left"} onChange={(e) => this.setPositionValue(e.currentTarget.value)}>Left</ToggleButton>
                    <ToggleButton value={"right"} checked={this.state.position === "right"} onChange={(e) => this.setPositionValue(e.currentTarget.value)}>Right</ToggleButton>
                </ToggleButtonGroup>
                <br />
            </>
            );
        } else if (this.state.widget === "Actuality") {
            if (!Global_State.toDisplayError) {
                return (<>
                    <Row>
                        <Col>
                            <FormControl component="fieldset">
                                <FormLabel component="legend"></FormLabel>
                                <RadioGroup aria-label="gender" name="infoIntra" value={this.state.radio} onChange={this.onChangeInputIntraradio}>
                                    <FormControlLabel value="Top" control={<Radio />} label="Top headlines" />
                                    <FormControlLabel value="Section" control={<Radio />} label={<TextField label="Key Word" variant="outlined" onChange={this.onChangeKeyWord} onClick={() => this.setState({ radio: "Section" })} />} />
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
                        <TextField id="outlined-basic" label="Number of articles" variant="outlined" onChange={this.onChangeNumberArticles} />
                    </form>
                    <br />
                    <ToggleButtonGroup type="checkbox" value={this.state.position}>
                        <ToggleButton value={"left"} checked={this.state.position === "left"} onChange={(e) => this.setPositionValue(e.currentTarget.value)}>Left</ToggleButton>
                        <ToggleButton value={"right"} checked={this.state.position === "right"} onChange={(e) => this.setPositionValue(e.currentTarget.value)}>Right</ToggleButton>
                    </ToggleButtonGroup>
                    <br />
                </>
                );
            } else {
                return (<>
                    <Row>
                        <Col>
                            <FormControl component="fieldset">
                                <FormLabel component="legend"></FormLabel>
                                <RadioGroup aria-label="gender" name="infoIntra" value={this.state.radio} onChange={this.onChangeInputIntraradio}>
                                    <FormControlLabel value="Top" control={<Radio />} label="Top headlines" />
                                    <FormControlLabel value="Section" control={<Radio />} label={<TextField label="Key Word" variant="outlined" onChange={this.onChangeKeyWord} onClick={() => this.setState({ radio: "Section" })} />} />
                                </RadioGroup>
                            </FormControl>
                        </Col>
                        <Col>
                            <FormControl component="fieldset">
                                <FormLabel component="legend"></FormLabel>
                                <RadioGroup aria-label="gender" name="infoIntra" value={this.state.country} onChange={this.onChangeCountry}>
                                    <FormControlLabel value="fr" control={<Radio />} label="French" />
                                    <FormControlLabel value="en" control={<Radio />} label="English" />
                                    <FormControlLabel value="es" control={<Radio />} label="Spanish" />
                                </RadioGroup>
                            </FormControl>
                        </Col>
                    </Row>
                    <br />
                    <p>Number of articles to display:</p>
                    <form noValidate autoComplete="off">
                        <TextField error id="outlined-basic" label="Number of articles" variant="outlined" onChange={this.onChangeNumberArticles} />
                    </form>
                    <br />
                    <ToggleButtonGroup type="checkbox" value={this.state.position}>
                        <ToggleButton value={"left"} checked={this.state.position === "left"} onChange={(e) => this.setPositionValue(e.currentTarget.value)}>Left</ToggleButton>
                        <ToggleButton value={"right"} checked={this.state.position === "right"} onChange={(e) => this.setPositionValue(e.currentTarget.value)}>Right</ToggleButton>
                    </ToggleButtonGroup>
                    <br />
                </>
                );
            }
        } else if (this.state.widget === "Todo") {
            return (<>
                <form noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Name of the widget" variant="outlined" onChange={this.onChangeTodoKeyWord} />
                </form>
                <br />
                <ToggleButtonGroup type="checkbox" value={this.state.position}>
                    <ToggleButton value={"left"} checked={this.state.position === "left"} onChange={(e) => this.setPositionValue(e.currentTarget.value)}>Left</ToggleButton>
                    <ToggleButton value={"right"} checked={this.state.position === "right"} onChange={(e) => this.setPositionValue(e.currentTarget.value)}>Right</ToggleButton>
                </ToggleButtonGroup>
            </>);
        } else {
            return (<>
                Error. <br />
                Please Go back and select a widget.
            </>);
        }
    }
};


class ValidateNewWidgets extends Component {
    constructor(props) {
        super(props);
        this.state = { ...Global_State };
    }

    render() {
        if (this.state.SettingsOk === true && this.state.TypeOk === true) {
            return (
                <>
                    Position: {this.state.position}
                    <br />
                    Widget: {this.state.widget}
                </>
            );
        }
        return (
            <div>
                Error.<br />
                Here is the step where your settings are invalid:
                <ul>
                    {this.state.TypeOk === false ? <li>Step 1: Please Specify the type of your widget</li> : ""}
                    {this.state.SettingsOk === false ? <li>Step 2: Please fill all settings of your widget</li> : ""}
                </ul>
            </div>
        );
    }
};

class EndmessageWidgets extends Component {
    constructor(props) {
        super(props);
        this.state = { ...Global_State }
    }
    render() {
        return (<>
            <Alert variant="success">
                <Alert.Heading>Congrats</Alert.Heading>
                <p>
                    Aww yeah, you successfully added a new Widget to your DashBoard.
                </p>
                <hr />
                <p className="mb-0">
                    However, if you want to edit it, press the Cog button on your widget in your Dashboard's Home page.
                </p>
            </Alert>
        </>);
    }
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return <SetNewWidgets />;
        case 1:
            return <ConfigNewWidgets />;
        case 2:
            return <ValidateNewWidgets />;
        default:
            return 'Unknown step';
    }
}

function VerticalLinearStepper(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        var Globaldata = [];

        if (Global_State.TypeOk && Global_State.SettingsOk && activeStep === 2) {
            props.props.firebase.db.collection("data").doc(props.props.uid).get().then((result) => {
                var data_temp;
                if (result.exists) {
                    if (result.data().data === undefined) {
                        data_temp = {};
                    } else {
                        for (let i = 0; i < result.data().data.length; i++) {
                            if (result.data().data[i].widget === "Intra") {
                                data_temp = {
                                    autolog: result.data().data[i].autolog,
                                    desc: result.data().data[i].desc,
                                    nom: result.data().data[i].nom,
                                    position: result.data().data[i].position,
                                    typeRecup: result.data().data[i].typeRecup,
                                    widget: result.data().data[i].widget,
                                    timestamp: result.data().data[i].timestamp ? result.data().data[i].timestamp : 0
                                };
                            } else if (result.data().data[i].widget === "Weather") {
                                data_temp = {
                                    desc: result.data().data[i].desc,
                                    nom: result.data().data[i].nom,
                                    position: result.data().data[i].position,
                                    refresh: result.data().data[i].refresh,
                                    ville: result.data().data[i].ville,
                                    id: result.data().data[i].id ? result.data().data[i].id : 0,
                                    widget: result.data().data[i].widget,
                                    timestamp: result.data().data[i].timestamp ? result.data().data[i].timestamp : 0
                                };
                            } else if (result.data().data[i].widget === "Spotify") {
                                data_temp = {
                                    desc: result.data().data[i].desc ? result.data().data[i].desc : "",
                                    nom: "Spotify: Controller",
                                    widget: result.data().data[i].widget,
                                    position: result.data().data[i].position,
                                    timestamp: result.data().data[i].timestamp ? result.data().data[i].timestamp : 0
                                };
                            } else if (result.data().data[i].widget === "Actuality") {
                                data_temp = {
                                    desc: result.data().data[i].desc,
                                    nom: result.data().data[i].nom,
                                    timestamp: result.data().data[i].timestamp ? result.data().data[i].timestamp : 0,
                                    position: result.data().data[i].position,
                                    country: result.data().data[i].country,
                                    type: result.data().data[i].type,
                                    widget: result.data().data[i].widget,
                                    toDisplay: result.data().data[i].toDisplay,
                                };
                            } else if (result.data().data[i].widget === "Todo") {
                                data_temp = {
                                    desc: result.data().data[i].desc ? result.data().data[i].desc : "",
                                    nom: result.data().data[i].nom,
                                    widget: result.data().data[i].widget,
                                    position: result.data().data[i].position,
                                    timestamp: result.data().data[i].timestamp ? result.data().data[i].timestamp : 0,
                                    tasks: result.data().data[i].tasks
                                }
                            }
                            Globaldata.push(data_temp);
                        }
                    }
                }
            })
                .then(() => {
                    var data_temp = {};
                    if (Global_State.widget === "Intra") {
                        data_temp = {
                            autolog: (Global_State.settings.autolog !== undefined ? Global_State.settings.autolog : ""),
                            desc: "",
                            nom: "Intra: " + Global_State.settings.typeRecup,
                            position: Global_State.position,
                            typeRecup: Global_State.settings.typeRecup,
                            widget: Global_State.widget,
                            timestamp: Date.now()
                        }
                    } else if (Global_State.widget === "Weather") {
                        data_temp = {
                            desc: "",
                            nom: Global_State.widget + " " + Global_State.settings.city,
                            position: Global_State.position,
                            refresh: 10,
                            ville: Global_State.settings.city,
                            widget: Global_State.widget,
                            timestamp: Date.now(),
                            id: Global_State.settings.id
                        }
                    } else if (Global_State.widget === "Spotify") {
                        data_temp = {
                            desc: "",
                            nom: "Spotify: Controller",
                            widget: Global_State.widget,
                            position: Global_State.position,
                            timestamp: Date.now()
                        }
                    } else if (Global_State.widget === "Actuality") {
                        data_temp = {
                            desc: "",
                            nom: Global_State.widget + " " + Global_State.settings.typeRecup,
                            position: Global_State.position,
                            country: Global_State.settings.country,
                            type: Global_State.settings.typeRecup,
                            widget: Global_State.widget,
                            toDisplay: Global_State.toDisplay,
                            timestamp: Date.now()
                        }
                    } else if (Global_State.widget === "Todo") {
                        data_temp = {
                            desc: "",
                            nom: "TodoList: " + Global_State.nom,
                            widget: Global_State.widget,
                            position: Global_State.position,
                            timestamp: Date.now(),
                            tasks: []
                        }
                    } else {
                        return;
                    }
                    Globaldata.push(data_temp);
                    props.props.firebase.db.collection("data").doc(props.props.uid).set({
                        data: Globaldata
                    });
                })

        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        Global_State.position = '';
        Global_State.TypeOk = false;
        Global_State.SettingsOk = false;
        setActiveStep(0);
    };
    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical" style={{ backgroundColor: "transparent" }}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <Typography component={'span'}>{getStepContent(index)}</Typography>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        variant="contained"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                        disabled={activeStep === steps.length - 1 && Global_State.SettingsOk === false && Global_State.TypeOk === false}
                                    >
                                        {activeStep === steps.length - 1 ? 'Create' : 'Next'}
                                    </Button>
                                    {activeStep > 0 ? <Button onClick={handleReset} className={classes.button} color="secondary" variant="contained" >
                                        Reset
                                    </Button> : ""}
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer} style={{ backgroundColor: "transparent" }}>
                    <Typography component={'span'}><EndmessageWidgets /></Typography>
                    <Button onClick={handleReset}
                        className={classes.button}
                        variant="contained"
                        color="primary"
                    >
                        Reset
                    </Button>
                </Paper>
            )}
        </div>
    );
}

class AddPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAdded: false,
        }
    }

    render() {
        return (
            <AuthUserContext.Consumer >
                { authUser => (
                    <div className="container text-center" style={{ paddingTop: '60px' }}>
                        <ThemeSwitcher />
                        <div className="text-center">
                            <Link to={ROUTES.HOME}>Go Back</Link>
                        </div>
                        <VerticalLinearStepper props={this.props} />
                    </div>
                )
                }
            </AuthUserContext.Consumer >
        );
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AddPage);