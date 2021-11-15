import React, { Component } from 'react';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";


class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            add: false,
            newTask: '',
        };
        this.addTask = this.addTask.bind(this);
    }

    componentDidMount() {
        this.setState({
            data: this.props.data.widget.tasks,
            dbData: this.props.data.widget
        })

        var allData = []

        this.props.data.props.firebase.db.collection("data").doc(this.props.data.props.uid).get().then((result) => {
            var data_temp;
            if (result.exists) {
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
                    allData.push(data_temp);
                }
            }
        })
        this.setState({
            dbData: allData
        })
    }

    updateTask = (value) => {
        var widgetIndex;
        var dbData = this.state.dbData

        for (var i = 0; i < dbData.length; i++) {
            if (dbData[i].widget === "Todo") {
                for (var j = 0; j < dbData[i].tasks.length; j++) {
                    if (dbData[i].tasks[j].timestamp === value.timestamp) {
                        dbData[i].tasks[j].finished = !dbData[i].tasks[j].finished;
                        widgetIndex = i;
                        break;
                    }
                }
            }
        }
        this.props.data.props.firebase.db.collection("data").doc(this.props.data.props.uid).set({
            data: dbData
        });
        this.setState({
            dbData: dbData,
            data: dbData[widgetIndex].tasks
        });
    }

    addTask = () => {
        this.setState({ add: false })
        this.setState({
            newTask: ''
        })

        var newTask = this.state.newTask;
        var dbData = this.state.dbData;
        var widgetIndex;

        for (var i = 0; i < dbData.length; i++) {
            if (dbData[i].widget === "Todo") {
                dbData[i].tasks.push({
                    task: newTask,
                    finished: false,
                    timestamp: Date.now()
                });
                widgetIndex = i;
            }
        }
        this.props.data.props.firebase.db.collection("data").doc(this.props.data.props.uid).set({
            data: dbData
        });
        this.setState({
            dbData: dbData,
            data: dbData[widgetIndex].tasks
        })
    }

    handleKeyPress = (event) => {
        if (event.which === 13 || event.keyCode === 13) {
            this.addTask()
        }
    }

    deleteTask = (item) => {
        var data = this.state.data
        var dbData = this.state.dbData
        var selected = false;

        for (var k = 0; k < data.length; k++)
            if (data[k].timestamp === Number.parseInt(item))
                data.splice(k, 1)

        for (var i = 0; i < dbData.length; i++) {
            if (dbData[i].widget === "Todo") {
                for (var j = 0; j < dbData[i].tasks.length; j++) {
                    if (dbData[i].tasks[j].timestamp === Number.parseInt(item))
                        selected = true;
                }
                if (selected === true)
                    dbData[i].tasks = data;
            }
            selected = false;
        }
        this.setState({
            dbData: dbData
        });
        this.props.data.props.firebase.db.collection("data").doc(this.props.data.props.uid).set({
            data: dbData
        });
    }

    render() {
        if (this.state.loading === false) {
            return <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        }
        return (
            <>
                {this.state.data.map((item, nb) =>
                    <div key={nb}>
                        <Row>
                            <Col style={{ width: "70%" }}>
                                {item.task}
                            </Col>
                            <Row style={{ width: "30%" }}>
                                <Col style={{ width: "20%" }}>
                                    <div style={{ border: "1px solid grey", width: "25px", height: "25px", margin: "auto" }}>
                                        {item.finished === true ? <FontAwesomeIcon icon={faCheck} color="green" onClick={() => this.updateTask(item)} /> : <FontAwesomeIcon icon={faTimes} color="red" onClick={() => this.updateTask(item)}/>}
                                    </div>
                                </Col>
                                <Col style={{ width: "20%" }}>
                                    <Button value={item.timestamp} className="btn btn-danger btn-sm" onClick={(e) => this.deleteTask(e.target.value)}>-</Button>
                                </Col>
                            </Row>
                        </Row>
                        <hr />
                    </div>
                )}
                {this.state.add === false ? <Button className="btn btn-info" onClick={() => this.setState({ add: true })}>+</Button> :
                    <Row>
                        <Row style={{ width: "70%", margin: "auto" }}>
                            <Form.Control type="text" onKeyPress={this.handleKeyPress} placeholder="Title of your task" onChange={(e) => this.setState({ newTask: e.target.value })} />
                        </Row>
                        <Row style={{ width: "10%", margin: "auto", marginRight: "0"}}>
                            <Button className="btn btn-info btn-sm" style={{margin: "auto"}} onClick={this.addTask}>+</Button>
                        </Row>
                    </Row>
                }
            </>
        )
    }
}

export default Todo;