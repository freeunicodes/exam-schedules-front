import {Button} from "@mui/material";
import React, {useState} from "react";
import ContactForm from "./Contact";

interface ContactButtonProps {
    uniForTheme: "primary" | "secondary" | "info"
}

function ContactButton({uniForTheme}: ContactButtonProps) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="contained" color={uniForTheme} onClick={handleOpen}>
                Contact Us
            </Button>
            <ContactForm open={open} onClose={handleClose} uniForTheme={uniForTheme}/>
        </>
    );
}

export default ContactButton;
