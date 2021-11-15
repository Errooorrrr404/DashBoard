import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Intra from "./Intra/"
import Weather from "./Weather/"
import Actuality from "./Actuality/"
import Spotify from "./Spotify/"
import Todo from "./Todo/"
class WidgetSelecter extends Component {

    render() {
        switch (this.props.widget.widget.toLowerCase()) {
            case 'actuality':
                return <Actuality data={this.props.widget} />
            case 'intra':
                return <Intra data={this.props.widget} />
            case 'spotify':
                return <Spotify data={this.props} />
            case 'todo':
                return <Todo data={this.props} />
            case 'weather':
                return <Weather data={this.props.widget} />
            default:
                return <div className="container text-center">
                Error When Getting the widget
                </div >
        }
    }
}

export default WidgetSelecter;
