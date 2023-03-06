import React, {useState} from "react";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";

const startingUrl = (process.env.REACT_APP_SERVER_URL || "http://localhost:3636/") + "send-email"

interface ContactFormProps {
    open: boolean;
    onClose: () => void;
    uniForTheme: "primary" | "secondary" | "info";
}

function Contact({open, onClose, uniForTheme}: ContactFormProps) {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [message, setMessage] = useState<string>("");
    const [messageColor, setMessageColor] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const doesNotSend = () => {
        setMessage(
            "Sorry, there was an error sending your message. Please try again."
        );
        setMessageColor("red")
    }
    const successfullySend = () => {
        setMessage("Your message was sent successfully!");
        setMessageColor("green")
        setFormData({
            name: "",
            email: "",
            message: "",
        });
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setIsSubmitting(true)
        fetch(startingUrl, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            setIsSubmitting(false)
            if (response.ok) {
                successfullySend()
            } else {
                doesNotSend()
            }
        })
            .catch(_ => {
                setIsSubmitting(false)
                doesNotSend()
            })
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="contact-dialog-title">
            <form onSubmit={handleSubmit}>
                <DialogTitle id="contact-dialog-title">Contact Us</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                        required
                    />
                    <TextField
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        fullWidth
                        margin="dense"
                        required
                    />
                    {isSubmitting && <CircularProgress size={24}/>}
                    {message && !isSubmitting && (
                        <DialogContentText style={{color: messageColor}}>{message}</DialogContentText>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color={uniForTheme}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color={uniForTheme} disabled={isSubmitting}>
                        Send
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default Contact;
