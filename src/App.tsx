import React, {useState} from 'react';
import './App.css';
import Search from "./components/Search";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from "./components/header";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: "#facd29"
        },
        secondary: {
            main: "#37b24c"
        },
        info: {
            main: "#c3273d"
        }
    },
});

function App() {

    const [uniForTheme, setUniForTheme] = useState<"primary" | "secondary" | "info">("primary")
    const [currUni, setCurrUni] = useState<string>("Freeuni")

    const setTheme = (theme: "primary" | "secondary" | "info") => {
        setUniForTheme(theme)
    }

    const setUni = (uni: string) => {
        setCurrUni(uni)
    }

    return (
        <div className="App">
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <Header uniForTheme={uniForTheme}/>
                <Search currUni={currUni} uniForTheme={uniForTheme} setTheme={setTheme} setUni={setUni}/>
            </ThemeProvider>
        </div>
    );
}

export default App;
