import React, { Component } from 'react'
import { Provider, Heading, Subhead, NavLink, Small, Flex } from 'rebass'
import {
    Hero, CallToAction, ScrollDownIndicator
} from 'react-landing-page'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Nav } from 'react-bootstrap';
import "./style.css";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GithubIcon from "@material-ui/icons/GitHub";
import BenjaminProfile from '../../assets/profile.jpg';
import NoemieProfile from '../../assets/noemie.deraedt.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-scroll'


function ScrollToTopIndicator() {
    return (<div>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="38.735"
            width="33.749"
        >
            <g transform="translate(-18.121 -3.364)">
                <rect
                    ry="4.928"
                    y="3.364"
                    x="18.121"
                    height="38.735"
                    width="33.749"
                    fill="#00f"
                />
                <g transform="translate(-.48 2.134)">
                    <rect
                        ry="4.928"
                        y="1.229"
                        x="18.601"
                        height="38.735"
                        width="33.749"
                        fill="url(#b)"
                    />
                    <g fill="#ececec">
                        <path d="M22.435 17.62l4.684 4.685 5.044-5.044v19.352h6.625V17.26l5.044 5.044 4.683-4.684-13.04-13.04z" />
                        <path d="M22.435 17.62l4.684 4.685 5.044-5.044v19.352h6.625V17.26l5.044 5.044 4.683-4.684-13.04-13.04z" />
                    </g>
                </g>
            </g>
        </svg>
    </div>);
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_visible: false
        };
    }

    componentDidMount() {
        var scrollComponent = this;
        document.addEventListener("scroll", function (e) {
            scrollComponent.toggleVisibility();
        });
    }

    toggleVisibility() {
        if (window.pageYOffset > window.innerHeight - 10) {
            this.setState({
                is_visible: true
            });
        } else {
            this.setState({
                is_visible: false
            });
        }
    }

    render() {
        const { is_visible } = this.state;

        return (
            <div id="top">
                <Provider style={{ overflowY: 'hidden' }}>
                    <Hero
                        color="black"
                        bg="white"
                        backgroundImage="https://source.unsplash.com/jxaj-UrzQbc/1600x900"
                    >
                        <Heading>DashBoard</Heading>
                        <Subhead>By Noémie and Benjamin</Subhead>
                        <CallToAction href="/signin" mt={3}>Join Us</CallToAction>
                        <Link to="start" spy={true} smooth={true}><ScrollDownIndicator /></Link>
                    </Hero>
                    <div className="container-fluid" id="start">
                        <Row style={{ height: 500, color: "white" }} className="bg-dark">
                            <Col sm={6} className="text-center my-auto">
                                What is DashBoard ?
                            </Col>
                            <Col sm={6} className="text-center my-auto">
                                "DashBoard" is an Epitech project carried out by 2 Tek3 students from Epitech Lille.<br />The goal of this project is to simplify your daily life thanks to customizable widgets.
                            </Col>
                        </Row>
                        <Row style={{ minHeight: 500 }}>
                            <Col sm={6} className="text-center order-2 order-sm-1 my-auto">
                                <Row>
                                    <Col sm={6} className="d-flex justify-content-around" style={{ paddingTop: "50px" }}>
                                        <Nav.Link href="https://noemie-deraedt.fr" target="blank">
                                            <Card style={{ height: "400px" }} className="resp-card">
                                                <CardHeader
                                                    avatar={
                                                        <Avatar aria-label="recipe" style={{ backgroundColor: "red" }}>
                                                            ND
                                                </Avatar>
                                                    }
                                                    title="Noémie DERAEDT"
                                                />
                                                <img src={NoemieProfile} alt="Logo" style={{ borderRadius: "5px" }} />

                                                <CardContent>
                                                    <Typography component={'span'} variant="body2" color="textSecondary">
                                                        Tek3 Student.<br />
                                                    Community Manager (Emma Lille)
                                                </Typography>
                                                </CardContent>
                                                <CardActions disableSpacing>
                                                    <Nav.Link href="https://www.linkedin.com/in/noemie-deraedt/" target="blank">
                                                        <IconButton aria-label="add to favorites">
                                                            <LinkedInIcon />
                                                        </IconButton>
                                                    </Nav.Link>
                                                    <Nav.Link href="https://github.com/NoemieDeraedt" target="blank">
                                                        <IconButton aria-label="share">
                                                            <GithubIcon />
                                                        </IconButton>
                                                    </Nav.Link>
                                                </CardActions>

                                            </Card>
                                        </Nav.Link>
                                    </Col>
                                    <Col sm={6} style={{ paddingTop: "50px" }} className="text-center">
                                        <Nav.Link href="https://benjamin-cunnington.fr" target="blank">
                                            <Card style={{ height: "400px" }} className="resp-card">
                                                <CardHeader
                                                    avatar={
                                                        <Avatar aria-label="recipe" style={{ backgroundColor: "blue" }}>
                                                            BB
                                            </Avatar>
                                                    }
                                                    title="Benjamin BAPPEL"
                                                />
                                                <img src={BenjaminProfile} alt="Logo" style={{ borderRadius: "5px" }} />
                                                <CardContent>
                                                    <Typography component={'span'} variant="body2" color="textSecondary" >
                                                        Tek3 Student<br />
                                            AER / ASTEXTE (Epitech Lille)
                                                </Typography>
                                                </CardContent>
                                                <CardActions disableSpacing>
                                                    <Nav.Link href="https://www.linkedin.com/in/benjamin-bappel-cunnington-1a286a156/" target="blank">
                                                        <IconButton aria-label="add to favorites">
                                                            <LinkedInIcon />
                                                        </IconButton>
                                                    </Nav.Link>
                                                    <Nav.Link href="https://github.com/Errooorrrr404" target="blank">
                                                        <IconButton aria-label="share">
                                                            <GithubIcon />
                                                        </IconButton>
                                                    </Nav.Link>
                                                </CardActions>
                                            </Card>
                                        </Nav.Link>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={6} className="text-center order-1 order-sm-2 my-auto">
                                Who are We ?
                </Col>
                        </Row>
                        <Row style={{ height: 500, color: "white" }} className="bg-dark">
                            <Col sm={6} className="text-center my-auto">
                                What can you do with Dashboard ?
                </Col>
                            <Col sm={6} className="text-center my-auto">
                                Login / Sign Up with your favorite account (Github, Google, Facebook) <FontAwesomeIcon icon={faCheck} style={{ color: "green", marginLeft: 10 }} />
                                <hr />
                        Add a widget <FontAwesomeIcon icon={faCheck} style={{ color: "green", marginLeft: 10 }} />
                                <hr />
                        Modify / Delete a widget <FontAwesomeIcon icon={faCheck} style={{ color: "green", marginLeft: 10 }} />
                                <hr />
                        Change / Reset your password <FontAwesomeIcon icon={faCheck} style={{ color: "green", marginLeft: 10 }} />
                                <hr />
                        Toogle Theme (Dark / Light) <FontAwesomeIcon icon={faCheck} style={{ color: "green", marginLeft: 10 }} />
                                <hr />
                        Drag and drop all widgets <FontAwesomeIcon icon={faCheck} style={{ color: "green", marginLeft: 10 }} />
                            </Col>
                        </Row>
                        <Row style={{ height: 500 }} >
                            <Col sm={6} className="text-center order-2 order-sm-1 my-auto">
                                Actuality
                                <hr />
                                Epitech Intranet
                                <hr />
                                Spotify
                                <hr />
                                ToDo List
                                <hr />
                                Weather
                </Col>
                            <Col sm={6} className="text-center order-1 order-sm-2 my-auto">
                                List of all available Service
                </Col>
                        </Row>
                        <Row style={{ height: 200, color: "white" }} className="bg-dark">
                            <Col sm={12} className="text-center my-auto">
                                <p style={{ paddingBottom: 20 }}>If you want to try, press the Demo Button</p>
                                <CallToAction href="/demo">DEMO</CallToAction>
                            </Col>
                        </Row>
                    </div>
                    <Flex is="footer" alignItems="center" p={3} className="bg-light" style={{ color: 'black' }}>
                        <NavLink children="Epitech" href="https://www.epitech.eu/fr/ecole-informatique-lille/" target="blank" />
                        <NavLink children="The Project" href="https://intra.epitech.eu/module/2020/B-DEV-500/LIL-5-1/" target="blank" />
                        <Small> © DashBoard, 2020</Small>
                    </Flex>
                </Provider>
                <div style={{ position: "fixed", bottom: "0.5rem", right: "0.5rem", animation: "fadeIn 700ms ease-in-out 1s both", cursor: "pointer" }}>
                    {is_visible && (
                        <Link to="top" spy={true} smooth={true}>
                            <ScrollToTopIndicator />
                        </Link>
                    )}
                </div>
            </div >
        );
    }
}

export default App;


// <Row>
// <Col sm={6} className="d-flex justify-content-around" style={{ paddingTop: "60px" }}>
//     <Card style={{ width: "300px", height: "380px" }}>
//         <CardHeader
//             avatar={
    //                 <Avatar aria-label="recipe" style={{ backgroundColor: "red" }}>
    //                     ND
    //                 </Avatar>
    //             }
    //             title="Noémie DERAEDT"
    //         />
//         <img src={NoemieProfile} alt="Logo" style={{ borderRadius: "5px" }} />

//         <CardContent>
//             <Typography variant="body2" color="textSecondary" component="p">
//                 Tek3 Student.
//     </Typography>
//         </CardContent>
//         <CardActions disableSpacing>
//             <IconButton aria-label="add to favorites">
//                 <LinkedInIcon />
//             </IconButton>
//             <IconButton aria-label="share">
//                 <GithubIcon />
//             </IconButton>
//         </CardActions>
//     </Card>
// </Col>
// <Col sm={6} style={{ paddingTop: "60px" }}>
//     <Card style={{ width: "300px", height: "380px" }}>
//         <CardHeader
//             avatar={
//                 <Avatar aria-label="recipe" style={{ backgroundColor: "blue" }}>
//                     BB
//         </Avatar>
//             }
//             title="Benjamin BAPPEL"
//         />
//         <img src={BenjaminProfile} alt="Logo" style={{ borderRadius: "5px" }} />
//         <CardContent>
//             <Typography variant="body2" color="textSecondary" component="p">
//                 Tek3 Student
//     </Typography>
//         </CardContent>
//         <CardActions disableSpacing>
//             <IconButton aria-label="add to favorites">
//                 <LinkedInIcon />
//             </IconButton>
//             <IconButton aria-label="share">
//                 <GithubIcon />
//             </IconButton>
//         </CardActions>
//     </Card>
// </Col>
// </Row>