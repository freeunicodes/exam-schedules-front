import {AppBar, Toolbar, Typography} from "@mui/material";
import React from "react";
import ContactButton from "./ContactButton";

interface HeaderProps {
    uniForTheme: "primary" | "secondary" | "info"
}

function Header({uniForTheme}: HeaderProps) {
    return (
        <div style={{height: '50px'}}>
            <AppBar>
                <Toolbar>
                    <a href={'/'} style={{textDecoration: "none", color: "white"}}>
                        <Typography variant="h6" noWrap>
                            Exam Schedules
                        </Typography>
                    </a>
                    <div style={{
                        display: "block",
                        marginLeft: "auto"
                    }}>
                        <ContactButton uniForTheme={uniForTheme}/>
                    </div>

                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header