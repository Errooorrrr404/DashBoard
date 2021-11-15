import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from 'react-router-dom';
import PageNotFound from '../..//assets/error.png';
import ThemeSwitcher from '../../constants/themeSwitcher';

const error = () => {
    return (
        <div>
          <ThemeSwitcher />
            <img alt="Error" src={PageNotFound} style={{textAlign: "center", display: "block", justifyContent: "center", alignItems: "center", margin: "auto", paddingTop: "50px"}} />
            <p style={{textAlign:"center"}}>
              <Link to="/">Go Back Home</Link>
            </p>
          </div>
    );
}

export default error;