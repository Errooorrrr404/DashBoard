import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from './theme'
import { GlobalStyles } from './style'


const ThemeSwitcher = (data) => {

    let actualtheme = localStorage.getItem('theme');
    if (!actualtheme)
        actualtheme = data.theme;
    let [theme] = useState(actualtheme);

    localStorage.setItem("theme", theme);
    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
                <GlobalStyles />
        </ThemeProvider>
    );
}

export default ThemeSwitcher;