import React, { Component } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://intra.epitech.eu/',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

class IntraAppointments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false
        }
    }

    componentDidMount() {
        let request = this.props.autolog + "/user/notification/coming?format=json";
        instance.get(request)
            .then(res => {
                if (res.data.length !== undefined) {
                    let tmp = res.data();
                    for (let i = 0; i < tmp.length; i++) {
                        tmp[i].title = tmp[i].title.replace("<a href=\"", "<a href=\"https://intra.epitech.eu/")
                        tmp[i].title = tmp[i].title.replace("<a href=\"", "<a href=\"https://intra.epitech.eu/")
                    }
                    this.setState({ data: tmp, loading: true });
                } else {
                    this.setState({ loading: true })
                }
            })
    }
    render() {
        if (this.state.loading === false) {
            return <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        }
        if (this.state.data.length < 1) {
            return "Noting to show..."
        } else {
            return <div>{this.state.data.map((data, index) => (
                <>
                    <p key={index}>
                        {data.date} : <div dangerouslySetInnerHTML={{ __html: data.title }} />
                    </p>
                    {index + 1 < this.state.data.length ? <hr /> : ""}
                </>))}
            </div>
        }
    }
}

class IntraNotifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
        }
    }

    componentDidMount() {
        let request = this.props.autolog + "/user/notification/message?format=json";
        instance.get(request)
            .then(res => {
                if (res.data.length !== undefined) {
                    let tmp = res.data;
                    for (let i = 0; i < tmp.length; i++) {
                        tmp[i].title = tmp[i].title.replace("<a href=\"", "<a target='blank' href=\"https://intra.epitech.eu")
                        tmp[i].title = tmp[i].title.replace("<a href=\"", "<a target='blank' href=\"https://intra.epitech.eu")
                    }
                    this.setState({ data: tmp, loading: true });
                }
            })
    }

    render() {
        if (this.state.loading === false) {
            return <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        }
        if (this.state.data.length < 1) {
            return "Noting to show..."
        } else {
            return <div>{this.state.data.map((data, index) => (
                <div key={index}>
                    <div >
                        {data.date} : <div key={index} dangerouslySetInnerHTML={{ __html: data.title }} />
                    </div>
                    {index + 1 < this.state.data.length ? <hr /> : ""}
                </div>))}
            </div>
        }
    }
}

class IntraGPAcredits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false
        }
    }

    componentDidMount() {
        let request = this.props.autolog + "/user/?format=json";
        instance.get(request)
            .then(res => {
                this.setState({ data: res.data, loading: true });
            })
    }

    render() {
        if (this.state.loading === false) {
            return <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        }
        if (this.state.data.length < 1) {
            return "Noting to show..."
        } else {
            return <div>
                <Row>
                    <Col>
                        GPA: {this.state.data.gpa[0].gpa}
                    </Col>
                    <Col>
                        Credits: {this.state.data.credits}
                    </Col>
                </Row>
            </div>
        }
    }
}

class Intra extends Component {

    render() {
        let autolog = this.props.data.autolog;
        if (autolog.includes("intra.epitech.eu"))
            autolog = autolog.substr(25);
        switch (this.props.data.typeRecup) {
            case 'appointments':
                return <IntraAppointments autolog={autolog} />
            case 'notifications':
                return <IntraNotifications autolog={autolog} />
            case 'GPAcredits':
                return <IntraGPAcredits autolog={autolog} />
            case 'all':
                return (
                    <>
                        <p><b>GPA and credits:</b></p>
                        <IntraGPAcredits autolog={autolog} />
                        <br />
                        <p><b>Notifications:</b></p>
                        <IntraNotifications autolog={autolog} />
                        <br />
                        <p><b>Next Appointments:</b></p>
                        <IntraAppointments autolog={autolog} />
                    </>
                );
            default:
                return (
                    <div className="container text-center">
                        Error When Getting Your settings

                    </div >
                );
        }

    }
}

export default Intra;
