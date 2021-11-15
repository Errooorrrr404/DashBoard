import React, { Component, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Row, Col, Button, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../../constants/theme'
import { GlobalStyles } from '../../constants/style'
import { Link } from 'react-router-dom';
import WidgetSelecter from "../Widgets/Components/";

const ThemeSwitcher = (data) => {

    let actualtheme = localStorage.getItem('theme');
    if (!actualtheme)
        actualtheme = data.theme;
    let [theme, setTheme] = useState(actualtheme);
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }
    localStorage.setItem("theme", theme);

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <>
                <GlobalStyles />
                <Button onClick={toggleTheme}>Toggle theme</Button>
                <p style={{ paddingTop: '10px' }}>Current theme: {theme}</p>
                <footer>
                </footer>
            </>
        </ThemeProvider>
    );
}

// fake data generator
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

class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: getItems([], 0)
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }
    componentDidMount() {
        const data = [{
            "widget": "weather",
            "nom": "Weather: Lille",
            "ville": "Lille",
            "refresh": 10,
            "position": "left",
            "desc": "",
        }, {
            "widget": "actuality",
            "nom": "Actuality",
            "country": "fr",
            "type": "Top",
            "toDisplay": 2
        }, {
            "widget": "weather",
            "nom": "Weather: Paris",
            "ville": "Paris",
            "refresh": 10,
            "position": "left",
            "desc": "",

        }]
        this.setState({
            items: getItems(data, data.length)
        })
    }
    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );

        this.setState({
            items
        });
    }

    render() {
        return (
            <div className="container-fluid" style={{ paddingTop: '60px' }}>
                <p style={{ textAlign: "center" }}>
                    <Link to="/">Go Back Home</Link>
                </p>
                <Row>
                    <Col sm={6} className="text-center my-auto" style={{ display: 'block', margin: "auto" }}>
                        <DragDropContext onDragEnd={(result) => this.onDragEnd(result)}>
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
                                                                {item.data[0].nom}
                                                            </Card.Header>
                                                            <Card.Body>
                                                                <WidgetSelecter widget={item.data[0]} />
                                                            </Card.Body>
                                                        </Card>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </Col>
                    <Col sm={6} className="text-center">
                        <ThemeSwitcher theme={"light"} />
                    </Col>
                </Row>
            </div >
        );
    }
}


export default Demo;

