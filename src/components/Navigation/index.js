import React from 'react';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { Navbar, Nav } from 'react-bootstrap';
import Logo from '../../assets/Logo.png';

const Navigation = ({ authUser }) => (
    <Navbar fixed="top" expand="lg" variant="dark" bg="dark" id="navigation_bar">
        <Navbar.Brand href={authUser ? ROUTES.HOME : ROUTES.LANDING}><img
        src={Logo}
        height="50px"
        width="auto"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="mr-auto">
                {authUser ? <NavigationAuth /> : <NavigationNonAuth />}
            </Nav>
            {authUser ? <SignOutButton /> : <></>}
        </Navbar.Collapse>
    </Navbar>
);

const NavigationAuth = () => (
    <>
        <Nav.Link href={ROUTES.ACCOUNT}>Account</Nav.Link>
    </>
);

const NavigationNonAuth = () => (
    <>
        <Nav.Link href={ROUTES.SIGN_IN}>Sign In</Nav.Link>
    </>
);

export default Navigation;