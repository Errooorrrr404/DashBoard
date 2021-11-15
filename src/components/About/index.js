import React, { Component } from 'react';
import ThemeSwitcher from '../../constants/themeSwitcher';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            IP: '',
        }
    }
    getIP() {
        const publicIp = require('public-ip');

        (async () => {
            this.setState({IP: await publicIp.v4()});
        })();
    }

    componentDidMount = () => {
        this.getIP();
        document.getElementById('navigation_bar').style.display = "none";
    }
    render() {
        return (
            <><ThemeSwitcher />
                {'{'} <br />
                <ul style={{ listStyle: "none" }}>
                    <li style={{ listStyle: "none" }}>"client": {'{'}</li>
                    <ul style={{ listStyle: "none" }}>
                        <li>"host": "{this.state.IP}"</li>
                    </ul>
                    <li>{'},'}</li>
                    <li style={{ listStyle: "none" }}>"server": {'{'} <br /></li>
                    <ul style={{ listStyle: "none" }}>
                        <li>"current_time": "{Date.now()}",</li>
                        <li>"services": {'[{'}</li>
                        <ul style={{ listStyle: "none" }}>
                            <li>"name": "weather",</li>
                            <li>"widgets": {'[{'}</li>
                            <ul style={{ listStyle: "none" }}>
                                <li>"name": "city_temperature",</li>
                                <li>"description": "Display temperature and weather for a city",</li>
                                <li>"params": {'[{'}</li>
                                <ul style={{ listStyle: "none" }}>
                                    <li>"name": "city",</li>
                                    <li>"type": "string",</li>
                                </ul>
                                <li>{'},{'}</li>
                                <ul style={{ listStyle: "none" }}>
                                    <li>"name": "position",</li>
                                    <li>"type": "string",</li>
                                </ul>
                                <li>{'}]'}</li>
                            </ul>
                            <li>{'}]'}</li>
                        </ul>
                        <li>{'}, {'}</li>
                        <ul style={{ listStyle: "none" }}>
                            <li>"name": "intranet",</li>
                            <li>"widgets": {'[{'}</li>
                            <ul style={{ listStyle: "none" }}>
                                <li>"name": "notifications",</li>
                                <li>"description": "Display the user's notifications",</li>
                                <li>"params": {'[{'}</li>
                                <ul style={{ listStyle: "none" }}>
                                    <li>"autolog": "autologin-link",</li>
                                    <li>"type": "string",</li>
                                </ul>
                                <li>{'},{'}</li>
                                <ul style={{ listStyle: "none" }}>
                                    <li>"name": "position",</li>
                                    <li>"type": "string",</li>
                                </ul>
                                <li>{'}]'}</li>
                            </ul>
                            <li>{'}, {'}</li>
                            <ul style={{ listStyle: "none" }}>
                                <li>"name": "appointments",</li>
                                <li>"description": "Display the user's upcoming appointments",</li>
                                <li>"params": {'[{'}</li>
                                <ul style={{ listStyle: "none" }}>
                                    <li>"autolog": "autologin-link",</li>
                                    <li>"type": "string",</li>
                                </ul>
                                <li>{'}, {'}</li>
                                <ul style={{ listStyle: "none" }}>
                                    <li>"name": "position",</li>
                                    <li>"type": "string",</li>
                                </ul>
                                <li>{'}]'}</li>
                            </ul>
                            <li>{'}, {'}</li>
                            <ul style={{ listStyle: "none" }}>
                                <li>"name": "GPAcredits",</li>
                                <li>"description": "Display the user's GPA and credits",</li>
                                <li>"params": {'[{'}</li>
                                <ul style={{ listStyle: "none" }}>
                                    <li>"autolog": "autologin-link",</li>
                                    <li>"type": "string",</li>
                                </ul>
                                <li>{'}, {'}</li>
                                <ul style={{ listStyle: "none" }}>
                                    <li>"name": "position",</li>
                                    <li>"type": "string",</li>
                                </ul>
                                <li>{'}]'}</li>
                            </ul>
                            <li>{'}]'}</li>
                        </ul>
                        <li>{'}, {'}</li>
                        <ul style={{ listStyle: "none" }}>
                            <li>"name": "Spotify",</li>
                            <li>"widgets": {'[{'}</li>
                            <ul style={{ listStyle: "none" }}>
                                <li>"name": "spotify_player",</li>
                                <li>"description": "Display the user's current music and allows to control music and sound (only with Spotify premium)",</li>
                                <li>"params": {'[{'}</li>
                                <ul style={{ listStyle: "none" }}>
                                    <li>"name": "position",</li>
                                    <li>"type": "string",</li>
                                </ul>
                                <li>{'}]'}</li>
                            </ul>
                            <li>{'}]'}</li>
                        </ul>
                        <li>{'}, {'}</li>
                        <ul style={{ listStyle: "none" }}>
                            <li>"name": "Actuality",</li>
                            <li>"widgets": {'[{'}</li>
                            <ul style={{ listStyle: "none" }}>
                                <li>"name": "top_news",</li>
                                <li>"description": "Display top News in the langage selected",</li>
                                <li>"params": {'[{'}</li>
                                <ul style={{ listStyle: "none" }}>
                                    <li>"name": "langage",</li>
                                    <li>"type": "string",</li>
                                </ul>
                                <li>{'}, {'}</li>
                                <ul style={{ listStyle: "none" }}>
                                    <li>"name": "position",</li>
                                    <li>"type": "string",</li>
                                </ul>
                                <li>{'}, {'}</li>
                                <ul style={{ listStyle: "none" }}>
                                    <li>"name": "toDisplay",</li>
                                    <li>"type": "number",</li>
                                </ul>
                                <li>{'}]'}</li>
                            </ul>
                            <li>{'}, {'}</li>
                            <ul style={{ listStyle: "none" }}>
                                <li>"name": "keyword_news",</li>
                                <li>"description": "Display the news related to the Keyword given in the langage selected",</li>
                                <li>"params": {'[{'}</li>
                                <ul style={{ listStyle: "none" }}>
                                    <li>"name": "keyword",</li>
                                    <li>"type": "string",</li>
                                </ul>
                                <li>{'}, {'}</li>
                                <ul style={{ listStyle: "none" }}>
                                    <li>"name": "langage",</li>
                                    <li>"type": "string",</li>
                                </ul>
                                <li>{'}, {'}</li>
                                <ul style={{ listStyle: "none" }}>
                                    <li>"name": "position",</li>
                                    <li>"type": "string",</li>
                                </ul>
                                <li>{'}, {'}</li>
                                <ul style={{ listStyle: "none" }}>
                                    <li>"name": "toDisplay",</li>
                                    <li>"type": "number",</li>
                                </ul>
                                <li>{'}]'}</li>
                            </ul>
                            <li>{'}]'}</li>
                        </ul>
                        <li>{'}, {'}</li>
                        <ul style={{ listStyle: "none" }}>
                            <li>"name": "ToDoList",</li>
                            <li>"widgets": {'[{'}</li>
                            <ul style={{ listStyle: "none" }}>
                                <li>"name": "ToDo",</li>
                                <li>"description": "Display a ToDo list",</li>
                                <li>"params": {'[{'}</li>
                                <ul style={{ listStyle: "none" }}>
                                    <li>"name": "name",</li>
                                    <li>"type": "string",</li>
                                </ul>
                                <li>{'},{'}</li>
                                <ul style={{ listStyle: "none" }}>
                                    <li>"name": "position",</li>
                                    <li>"type": "string",</li>
                                </ul>
                                <li>{'}]'}</li>
                            </ul>
                            <li>{'}]'}</li>
                        </ul>
                        <li>{'}]'}</li>
                    </ul>
                    <li>{'}'}</li>
                </ul>
                {'}'}
            </>
        );
    }
}

export default About;