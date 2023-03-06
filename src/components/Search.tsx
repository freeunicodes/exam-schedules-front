import {
    Box,
    Checkbox,
    CircularProgress,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material"
import React, {useEffect, useRef, useState} from 'react'
import axios from 'axios'
import {ExamInfo} from '../interfaces/ExamInfo'
import MyTable from './MyTable'

const startingUrl = (process.env.REACT_APP_SERVER_URL || "http://localhost:3636/") + "filters/"

// Global object used to abort current requests
let abortController: any;

interface SearchProps {
    uniForTheme: "primary" | "secondary" | "info",
    setTheme: (arg0: "primary" | "secondary" | "info") => void,
    currUni: string
    setUni: (arg0: string) => void
}

function Search({uniForTheme, setTheme, currUni, setUni}: SearchProps) {
    const ref = useRef(null);
    const [examsList, setExamsList] = useState<ExamInfo[]>([])
    const [onlyFutureExams, setOnlyFutureExams] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [lastChange, setLastChange] = useState<number>(0)


    useEffect(() => {
        const handleSearch = () => {
            if (ref.current == null) return
            const data = new FormData(ref.current);

            const subject = data.get('subject')
            const lecturer = data.get('lecturer')
            abortController = new AbortController()

            axios.get(startingUrl, {
                signal: abortController.signal,
                params: {lecturer: lecturer, university: currUni, subject: subject}
            })
                .then(response => {
                    setExamsList(response.data.examsList)
                    setIsLoading(false);
                })
                .catch(err => console.log(err))
        }

        const timeout = setTimeout(() => {
            handleSearch();
        }, 1000);
        return () => {
            if (abortController) {
                abortController.abort();
            }
            clearTimeout(timeout);
        };
    }, [lastChange, currUni]);

    const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOnlyFutureExams(event.currentTarget.checked);
    }

    const handleInputChange = () => {
        setIsLoading(true)
        setLastChange(Date.now())
    }

    const switchUni = (event: SelectChangeEvent) => {
        setUni(event.target.value)
        switch (event.target.value) {
            case "Freeuni":
                setTheme("primary")
                break
            case "Agruni":
                setTheme("secondary")
                break
            case "Culinary":
                setTheme("info")
                break
        }
        handleInputChange()
    }

    return (
        <Grid alignItems="center" justifyContent="center">
            <Box ref={ref} component="form" onChange={handleInputChange} noValidate sx={{mt: 1}}>
                <TextField
                    margin="normal"
                    label="Subject"
                    name="subject"
                    variant="standard"
                    color={uniForTheme}
                />
                <TextField
                    margin="normal"
                    label="Lecturer"
                    name="lecturer"
                    variant="standard"
                    sx={{
                        ml: 2,
                        mr: 2
                    }}
                    color={uniForTheme}
                />
                <FormControl variant="standard" sx={{mt: 2, minWidth: 120}}>
                    <InputLabel color={uniForTheme}>University</InputLabel>
                    <Select
                        label="University"
                        value={currUni}
                        color={uniForTheme}
                        onChange={switchUni}
                    >
                        <MenuItem value={"Freeuni"}>Freeuni</MenuItem>
                        <MenuItem value={"Agruni"}>Agruni</MenuItem>
                        <MenuItem value={"Culinary"}>Culinary</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <FormControlLabel
                control={<Checkbox color={uniForTheme} checked={onlyFutureExams} onChange={handleSwitch}/>}
                label={"მაჩვენე მხოლოდ მომავალი"}/>
            <Box>
                {!isLoading ? <MyTable examsList={examsList} showOnlyFuture={onlyFutureExams}/> :
                    <CircularProgress color={uniForTheme}/>
                }
            </Box>
        </Grid>
    )
}

export default Search;