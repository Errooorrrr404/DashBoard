import React, { Component } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

class TopActuality extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false
        }
    }

    componentDidMount() {
        let language = this.props.data.country === "en" ? "us" : this.props.data.country;
        let request = "top-headlines?country=" + language + "&apiKey=";
        instance.get(request)
            .then(res => {
                if (res.data.articles.length !== undefined) {
                    let tmp = res.data.articles;
                    let data = []
                    for (let i = 0; i < tmp.length && i < this.props.data.toDisplay; i++)
                        data.push(tmp[i]);
                    for (let i = 0; i < data.length; i++) {
                        data[i].publishedAt = data[i].publishedAt.replace("T", " ");
                        data[i].publishedAt = data[i].publishedAt.substr(0, data[i].publishedAt.length - 4);
                    }
                    this.setState({ data: data, loading: true });
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
            return "Nothing to show..."
        } else {
            return <div>{this.state.data.map((data, index) => (
                <>
                    <Row>
                        <Col sm={3}><img src={data.urlToImage} alt={data.description} style={{ height: 100 }} /></Col>
                        <Col sm={9} className="text-center my-auto">{data.title} {" "}
                            <a href={data.url} rel="noreferrer" target="_blank" className="text-center">Show More</a>
                        </Col>
                    </Row>
                    <p style={{ marginTop: 10, marginBottom: 10, textAlign: 'left' }}><cite>{data.source.name}{data.author != null ? ": " + data.author + " " : " "} ({data.publishedAt})</cite></p>

                    {index + 1 < this.state.data.length ? <hr /> : ""}
                </>))}
            </div>
        }
    }
}

class KeyWordActuality extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false
        }
    }

    componentDidMount() {
        let request = "everything?q=" + this.props.data.type + "&language=" + this.props.data.country + "&apiKey=b7414e459a6840cc92ab38640f47d2eb";
        instance.get(request)
            .then(res => {
                if (res.data.articles.length !== undefined) {
                    let tmp = res.data.articles;
                    let data = []
                    for (let i = 0; i < tmp.length && i < this.props.data.toDisplay; i++)
                        data.push(tmp[i]);
                    this.setState({ data: data, loading: true });
                } else
                    this.setState({ loading: true })
            })
    }
    render() {
        if (this.state.loading === false) {
            return <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        }
        if (this.state.data.length < 1) {
            return "Nothing to show..."
        } else {
            return <div>{this.state.data.map((data, index) => (
                <>
                    <Row>
                        <Col sm={3}><img src={data.urlToImage} alt={data.description} style={{ height: 100 }} /></Col>
                        <Col sm={9} className="text-center my-auto">{data.title} {" "}
                            <a href={data.url} rel="noreferrer" target="_blank" className="text-center">Show More</a>
                        </Col>
                    </Row>
                    <p style={{ marginTop: 10, marginBottom: 10, textAlign: 'left' }}><cite >{data.source.name}{data.author != null ? ": " + data.author : ""}</cite></p>

                    {index + 1 < this.state.data.length ? <hr /> : ""}
                </>))}
            </div>
        }
    }
}

class Actuality extends Component {
    render() {
        switch (this.props.data.type.toLowerCase()) {
            case "top":
                return <TopActuality data={this.props.data} />;
            default:
                return <KeyWordActuality data={this.props.data} />;
        }
    }
}

export default Actuality;
