import React, { Component } from 'react';
import { Row, Col, Spinner, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Player.css"
import { faPlay, faVolumeUp, faVolumeDown, faVolumeMute, faForward, faBackward, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LinearProgress from '@material-ui/core/LinearProgress';
import * as $ from "jquery";
import UnknownMusic from "../../../../assets/unknow_music.png"

export const authEndpoint = 'https://accounts.spotify.com/authorize/?';// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "";
const redirectUri = "http://localhost:8080/home";

const scopes = [
    "user-modify-playback-state",
    "user-read-playback-position",
    "user-top-read",
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-read-email",
    "user-read-private",
    "playlist-read-private",
    "user-library-read",
    "user-library-modify",
    "user-top-read",
    "playlist-read-collaborative",
    "playlist-modify-public",
    "playlist-modify-private",
    "ugc-image-upload",
    "user-follow-read",
    "user-follow-modify",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played"
];
// Get the hash of the url

const hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce(function (initial, item) {
        if (item) {
            var parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {}); window.location.hash = "";


const Player = props => {
    return (
        <Row>
            <Col sm={6}>
                <img src={props.cover} alt="Album" style={{ width: 250 }} />
            </Col>
            <Col sm={6} className="text-center my-auto">
                <div className="now-playing_name">{props.item.name}</div>
                <div className="now-playing_artist">
                    {props.item.artists.map((item, key) => (
                        <p key={key}>{item.name}</p>
                    ))}
                </div>
                <LinearProgress variant="determinate" value={(props.progress / props.item.duration_ms) * 100} />

            </Col>
        </Row>
    );
}

class Spotify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            dataSpotify: {
                album: {
                    images: [{ url: "" }]
                },
                name: "",
                artists: [{ name: "" }],
                duration_ms: 0,
            },
            play: true,
            loading: true,
            cover: UnknownMusic,
            progress: 0,
            IAmPremium: false,
            sound: 0,
        }
    }

    getCurrentlyPlaying(token) {
        $.ajax({
            url: "https://api.spotify.com/v1/me/",
            type: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: (data) => {
                if (data === undefined)
                    return;
                if (data.product === "premium") {
                    this.setState({ IAmPremium: true })
                }
            }, error: () => {
            }
        });
        $.ajax({
            url: "https://api.spotify.com/v1/me/player",
            type: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: (data) => {
                if (data === undefined)
                    return;
                this.setState({
                    dataSpotify: data.item,
                    cover: data.item.album.images[1].url,
                    play: data.is_playing,
                    progress: data.progress_ms,
                });
            }, error: () => {
                this.setState({
                    token: ""
                });
            }
        });
    }
    componentDidMount() {
        let _token = hash.access_token;
        if (_token) {
            this.setState({
                token: _token,
                loading: true,
            });
            this.getCurrentlyPlaying(_token);
            window.setInterval(this.updateSpotifySystem, 1000);
        } else if (this.props.data.widget.token !== "") {
            this.setState({
                token: this.props.data.widget.token,
                loading: true,
            });
            this.getCurrentlyPlaying(this.props.data.widget.token);
            window.setInterval(this.updateSpotifySystem, 1000);
        }
    }
    updateSpotifySystem = () => {
        if (this.state.token === "" || this.state.token === undefined)
            return;
        $.ajax({
            url: "https://api.spotify.com/v1/me/player/",
            type: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + this.state.token);
            },
            success: (data) => {
                if (data === undefined)
                    return;
                this.setState({
                    dataSpotify: data.item,
                    cover: data.item.album.images[0].url,
                    play: data.is_playing,
                    progress: data.progress_ms,
                });
            }
        });
        $.ajax({
            url: "https://api.spotify.com/v1/me/player/",
            type: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + this.state.token);
            },
            success: (data) => {
                if (data === undefined)
                    return;
                this.setState({
                    volume: data.device.volume_percent ? data.device.volume_percent : 0,
                    dataSpotify: data.item,
                    cover: data.item.album.images[0].url,
                    play: data.is_playing,
                    progress: data.progress_ms,
                });
            }
        });
    }
    VolumeMute = () => {
        $.ajax({
            url: "https://api.spotify.com/v1/me/player/volume?volume_percent=0",
            type: "PUT",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + this.state.token);
            },
            success: (data) => {
            }
        });
    }
    VolumeDown = () => {
        let newSound = this.state.sound - 10

        if (newSound < 0) {
            newSound = 0;
        }
        this.setState({sound: newSound})
        $.ajax({
            url: "https://api.spotify.com/v1/me/player/volume?volume_percent=" + newSound.toString(),
            type: "PUT",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + this.state.token);
            },
            success: (data) => {
            }
        });
    }
    VolumeUp = () => {
        let newSound = this.state.sound + 10

        if (newSound > 100) {
            newSound = 100;
        }
        this.setState({sound: newSound})
        $.ajax({
            url: "https://api.spotify.com/v1/me/player/volume?volume_percent=" + newSound.toString(),
            type: "PUT",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + this.state.token);
            },
            success: (data) => {
            }
        });
    }
    prevTrack = () => {

        $.ajax({
            url: "https://api.spotify.com/v1/me/player/previous",
            type: "POST",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + this.state.token);
            },
            success: (data) => {
                if (data === undefined)
                    return;
                this.setState({
                    dataSpotify: data.item,
                    cover: data.item.album.images[1].url,
                    play: data.is_playing,
                    progress: data.progress_ms,
                });
            }
        });
    }
    nextTrack = () => {

        $.ajax({
            url: "https://api.spotify.com/v1/me/player/next",
            type: "POST",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + this.state.token);
            },
            success: (data) => {
                if (data === undefined)
                    return;
                this.setState({
                    dataSpotify: data.item,
                    cover: data.item.album.images[1].url,
                    play: data.is_playing,
                    progress: data.progress_ms,
                });
            }
        });
    }

    changeState = () => {
        if (this.state.play === true) {
            $.ajax({
                url: "https://api.spotify.com/v1/me/player/pause",
                type: "PUT",
                beforeSend: (xhr) => {
                    xhr.setRequestHeader("Authorization", "Bearer " + this.state.token);
                },
                success: (data) => {
                    if (data === undefined)
                        return;
                }, fail: () => {
                }
            });
        } else {
            $.ajax({
                url: "https://api.spotify.com/v1/me/player/play",
                type: "PUT",
                beforeSend: (xhr) => {
                    xhr.setRequestHeader("Authorization", "Bearer " + this.state.token);
                },
                success: (data) => {
                    if (data === undefined)
                        return;
                    this.setState({
                        dataSpotify: data.item,
                        cover: data.item.album.images[1].url,
                        play: data.is_playing,
                        progress: data.progress_ms,
                    });
                }
            });
        }
        this.setState({ play: !this.state.play })
    }
    render() {
        if (this.state.loading === false) {
            return <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        }
        // if (this.state.data.length < 1) {
        //     return "Noting to show..."
        // } else {
        // return (
        if (this.state.token === "") {
            return(
                <Button
                    variant="success"
                    href={`${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
                >
                    Login to Spotify
                </Button>
            );
        } else {
            console.log(this.state.IAmPremium)
            if (this.state.IAmPremium === true) {
                return(
                    <div>
                        <Row>
                            <Col sm={12} style={{ paddingBottom: 20 }}>
                                <Player
                                    item={this.state.dataSpotify}
                                    cover={this.state.cover}
                                    progress={this.state.progress}
                                />
                            </Col>
                            <Col sm={6} style={{ paddingBottom: 20 }}>
                                <Row>
                                    <Col>
                                        <Button variant="outline" onClick={this.prevTrack}><FontAwesomeIcon icon={faBackward} style={{ fontSize: "22px", cursor: "pointer" }} /></Button>
                                    </Col>
                                    <Col>
                                        <Button variant="outline" onClick={this.changeState}><FontAwesomeIcon icon={this.state.play ? faPause : faPlay} style={{ fontSize: "22px", cursor: "pointer" }} /></Button>
                                    </Col>
                                    <Col>
                                        <Button variant="outline" onClick={this.nextTrack}><FontAwesomeIcon icon={faForward} style={{ fontSize: "22px", cursor: "pointer" }} /></Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={6}>
                                <Row>
                                    <Col>
                                        <Button variant="outline" onClick={this.VolumeMute} ><FontAwesomeIcon icon={faVolumeMute} style={{ fontSize: "22px", cursor: "pointer" }} /></Button>
                                    </Col>
                                    <Col>
                                        <Button variant="outline" onClick={this.VolumeDown}><FontAwesomeIcon icon={faVolumeDown} style={{ fontSize: "22px", cursor: "pointer" }} /></Button>
                                    </Col>
                                    <Col>
                                        <Button variant="outline" onClick={this.VolumeUp}><FontAwesomeIcon icon={faVolumeUp} style={{ fontSize: "22px", cursor: "pointer" }} /></Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                )
            } else {
                return(
                    <div>
                        <Row>
                            <Col sm={12} style={{ paddingBottom: 20 }}>
                                <Player
                                    item={this.state.dataSpotify}
                                    cover={this.state.cover}
                                    progress={this.state.progress}
                                />
                            </Col>
                            <Col sm={6} style={{ paddingBottom: 20 }}>
                                <Row>
                                    <Col>
                                        <Button variant="outline" disabled={true}><FontAwesomeIcon icon={faBackward} style={{ fontSize: "22px", cursor: "pointer" }} /></Button>
                                    </Col>
                                    <Col>
                                        <Button variant="outline" disabled={true}><FontAwesomeIcon icon={this.state.play ? faPause : faPlay} style={{ fontSize: "22px", cursor: "pointer" }} /></Button>
                                    </Col>
                                    <Col>
                                        <Button variant="outline" disabled={true}><FontAwesomeIcon icon={faForward} style={{ fontSize: "22px", cursor: "pointer" }} /></Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={6}>
                                <Row>
                                    <Col>
                                        <Button variant="outline" disabled={true}><FontAwesomeIcon icon={faVolumeMute} style={{ fontSize: "22px", cursor: "pointer" }} /></Button>
                                    </Col>
                                    <Col>
                                        <Button variant="outline" disabled={true}><FontAwesomeIcon icon={faVolumeDown} style={{ fontSize: "22px", cursor: "pointer" }} /></Button>
                                    </Col>
                                    <Col>
                                        <Button variant="outline" disabled={true} ><FontAwesomeIcon icon={faVolumeUp} style={{ fontSize: "22px", cursor: "pointer" }} /></Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                )
            }
        }
    }
}

export default Spotify;
