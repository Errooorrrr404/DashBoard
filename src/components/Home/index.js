import React, { Component } from 'react';

import { withAuthorization, AuthUserContext } from '../Session';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Nav, Card, Row, Col } from 'react-bootstrap';
import '../../css/btn.css';
import * as ROUTES from '../../constants/routes';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Clock from 'react-live-clock';
import EditWidget from '../Widgets/Modify'
import ThemeSwitcher from '../../constants/themeSwitcher'
import WidgetSelecter from "../Widgets/Components/";

const getItems = (data, count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        index: `${k + offset}`,
        data: [data[`${k + offset}`]],
    }));

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'transparent' : 'transparent',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightgrey' : 'transparent',
    // padding: grid,
    width: "100%"
});

function updatePosDB(left, right, firebase, uid) {
    let dataTmp = []

    for (let i = 0; i < left.length; i++) {
        dataTmp.push(left[i].data[0])
    }
    for (let i = 0; i < right.length; i++) {
        dataTmp.push(right[i].data[0])
    }
    firebase.db.collection("data").doc(uid).set({
        data: (dataTmp)
    });
}

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: getItems([], 0),
            selected: getItems([], 0, 0),
            idLeft: [],
            idRight: [],
            data: {},
            uid: '',
            IP: '',
            urlBG: '',
        };
        this.onDragEndLeft = this.onDragEndLeft.bind(this);
        this.onDragEndRight = this.onDragEndRight.bind(this);
    }

    onDragEndLeft(result) {
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );
        updatePosDB(items, this.state.selected, this.props.firebase, this.props.uid);

        this.setState({
            items
        });
    }
    onDragEndRight(result) {
        if (!result.destination) {
            return;
        }
        const selected = reorder(
            this.state.selected,
            result.source.index,
            result.destination.index
        );
        updatePosDB(this.state.items, selected, this.props.firebase, this.props.uid);
        this.setState({
            selected
        });
    }

    componentDidMount = () => {
        const publicIp = require('public-ip');
        (async () => {
            this.setState({ IP: await publicIp.v4() });
            this.props.firebase.db.collection("data").doc(this.props.uid).get().then((result) => {
                this.props.firebase.db.collection("background").doc(this.props.uid).get().then((result) => {
                    if (result.exists && result.data().selected === true) {
                        this.setState({
                            urlBG: result.data().url,
                        })
                    } else {
                        this.props.firebase.db.collection("background").doc(this.props.uid).update({ selected: false });
                        this.setState({
                            urlBG: '',
                        })
                    }
                });
                if (result.exists) {
                    if (result.data().data === undefined) {
                        this.setState({ data: {} });
                    } else {
                        this.setState({ data: result.data().data });
                        let idLeft = [];
                        let idRight = [];
                        for (let i = 0; i < result.data().data.length; i++) {
                            if (result.data().data[i].position === "left") {
                                idLeft.push(result.data().data[i]);
                            } else {
                                idRight.push(result.data().data[i]);
                            }
                        }
                        let merge = idLeft.concat(idRight);
                        this.setState({
                            items: getItems(idLeft, idLeft.length),
                            selected: getItems(merge, idRight.length, idLeft.length)
                        })
                    }
                } else
                    this.setState({ data: {} });
            });
        })().catch(err => console.log(err));

        this.props.firebase.db.collection("Ip").doc(this.props.uid).set({ IP: this.state.IP });

    }

    setBG = (data) => {
        document.getElementsByTagName("BODY")[0].style.background = "url('" + data + "') no-repeat center center fixed";
        document.getElementsByTagName("BODY")[0].style.height = "100%";
        document.getElementsByTagName("BODY")[0].style.backgroundSize = "cover";
        document.getElementsByTagName("BODY")[0].style.backgroundRepeat = "no-repeat";
        document.getElementsByTagName("BODY")[0].style.backgroundPosition = "center";
    }
    render() {
        return (
            <AuthUserContext.Consumer>
                {authUser => (
                    <div className="container-fluid text-center" style={{ paddingTop: '60px', position: "sticky" }}>
                        {this.state.urlBG !== '' ? this.setBG(this.state.urlBG) : ""}
                        <ThemeSwitcher />
                        <p id="time" style={{ fontFamily: "'Nova Mono', monospace", fontSize: "30px", textAlign: "center", textShadow: "0px 0px 20px" }}>
                            <Clock format={'HH:mm:ss'} ticking={true} />
                        </p>
                        <Row>
                            <Col sm={6}>
                                <DragDropContext onDragEnd={(result) => this.onDragEndLeft(result)}>
                                    <Droppable droppableId="droppable">
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                style={getListStyle(snapshot.isDraggingOver)}>
                                                {this.state.items.map((item, index) => (
                                                    <Draggable
                                                        key={item.id}
                                                        draggableId={item.id}
                                                        index={index}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={getItemStyle(
                                                                    snapshot.isDragging,
                                                                    provided.draggableProps.style
                                                                )}>
                                                                <Card>
                                                                    <Card.Header>
                                                                        {item.data[0].nom} <EditWidget props={this.props} widget={item.data[0]} />
                                                                    </Card.Header>
                                                                    <Card.Body>
                                                                        <WidgetSelecter widget={item.data[0]} props={this.props} />
                                                                    </Card.Body>
                                                                </Card>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>

                            </Col>
                            <Col sm={6} style={{ height: '100%' }}>
                                <DragDropContext onDragEnd={(result) => this.onDragEndRight(result)}>
                                    <Droppable droppableId="droppable2">
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                style={getListStyle(snapshot.isDraggingOver)}>
                                                {this.state.selected.map((item, index) => (
                                                    <Draggable
                                                        key={item.id}
                                                        draggableId={item.id}
                                                        index={index}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={getItemStyle(
                                                                    snapshot.isDragging,
                                                                    provided.draggableProps.style
                                                                )}>
                                                                <Card>
                                                                    <Card.Header>
                                                                        {item.data[0].nom} <EditWidget props={this.props} widget={item.data[0]} />
                                                                    </Card.Header>
                                                                    <Card.Body>
                                                                        <WidgetSelecter widget={item.data[0]} props={this.props} />
                                                                    </Card.Body>
                                                                </Card>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </Col>
                        </Row>
                        <Nav.Link href={ROUTES.ADDWIDGET} style={{ width: 'fit-content', display: 'block', margin: 'auto' }}><Button className="btn btn-success btn-circle btn-sm">+</Button></Nav.Link>
                    </div>
                )
                }
            </AuthUserContext.Consumer>
        );
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);