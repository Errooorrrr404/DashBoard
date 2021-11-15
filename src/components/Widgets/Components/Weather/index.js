import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css"
import axios from 'axios';


class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
        };
    }
    updateWeather = () => {
        let self = this;
        let name = self.props.data.nom.substr(8)
        axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + name + '&appid=&units=metric')
            .then(function (response) {
                self.setState({ data: (response.data) })
            });
    }

    componentDidMount() {
        window.setInterval(this.updateWeather, 10000);
        let self = this;
        let name = self.props.data.nom.substr(8)
        axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + name + '&appid=&units=metric')
            .then(function (response) {
                self.setState({ data: (response.data), loading: true })
            });
    }

    render() {
        if (this.state.loading === false) {
            return <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        }
        var sunrise_date = new Date(this.state.data.sys.sunrise * 1000);
        var sunrise_hours = sunrise_date.getHours();
        var sunrise_minutes = "0" + sunrise_date.getMinutes();
        var sunrise_formattedTime = sunrise_hours + ':' + sunrise_minutes.substr(-2);
        var sunrset_date = new Date(this.state.data.sys.sunset * 1000);
        var sunrset_hours = sunrset_date.getHours();
        var sunrset_minutes = "0" + sunrset_date.getMinutes();
        var sunrset_formattedTime = sunrset_hours + ':' + sunrset_minutes.substr(-2);

        return <div className="main-container">
            <div className="current-temperature">
                <div className="current-temperature_content-container"><div className="current-temperature_value"> {this.state.data.main.temp.toFixed(1)} &deg;C </div>
                    <div className="current-temperature_summary"> {this.state.data.weather[0].description} </div>
                </div >
            </div>
            <div className="current-stats">
                <div>
                    <div className="current-stats_value">{this.state.data.main.temp_max.toFixed(1)}&deg;C</div>
                    <div className="current-stats_label"> High </div>
                    <div className="current-stats_value"> {this.state.data.main.temp_min.toFixed(1)}&deg;C </div>
                    <div className="current-stats_label"> Low </div>
                </div>
                <div>
                    <div className="current-stats_value"> {this.state.data.wind.speed.toFixed(1)} km/h </div>
                    <div className="current-stats_label"> Wind </div>
                    <div className="current-stats_value"> {this.state.data.main.humidity.toFixed(1)}% </div>
                    <div className="current-stats_label"> Humidity </div>
                </div>
                <div>
                    <div className="current-stats_value"> {sunrise_formattedTime}</div>
                    <div className="current-stats_label"> Sunrise </div>
                    <div className="current-stats_value"> {sunrset_formattedTime}</div>
                    <div className="current-stats_label"> Sunset </div>
                </div>
            </div>
        </div >
    }
}

export default Weather;
