import { NavBar } from "../components/NavBar";
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Container, Grid } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
export const Home = () => {
    const [checkInValue,setCheckInValue] = useState<Dayjs | null>();
    const [checkOutValue,setCheckOutValue] = useState<Dayjs | null>();
    let minCheckOutDate:(Dayjs|null) = null ; 
    if(checkInValue != null){
        let temp = checkInValue;
        console.log('temp is ' , temp);
        minCheckOutDate = temp.add(1, 'day');
        if(minCheckOutDate.isAfter(checkOutValue)){
            console.log('we here!');
            setCheckOutValue(minCheckOutDate);
        }
    }
    return (
        <>
            <NavBar />
            <Container maxWidth="lg" className="mt-16">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    className="bg-slate-50 rounded-xl pt-4 pb-4"
                >
                    <div className="TimePickers mx-3">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                                components={["DatePicker", "DatePicker"]}
                            >
                                <DatePicker
                                    label="Check-in"
                                    defaultValue={dayjs()}
                                    disablePast={true}
                                    maxDate = {dayjs().set('year', 2025).set('month',1).set('date',1)}
                                    value={checkInValue}
                                    onChange={(newValue) => setCheckInValue(newValue)}
                                />

                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                    <div className="TimePickers mx-3">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                                components={["DatePicker", "DatePicker"]}
                            >
                                <DatePicker
                                    label="Check-out"
                                    disablePast={true}
                                    maxDate = {dayjs().set('year', 2025).set('month',1).set('date',1)}
                                    value={checkOutValue}
                                    onChange={(newValue) => setCheckOutValue(newValue)}
                                    minDate={minCheckOutDate}

                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                </Grid>
            </Container>
        </>
    );
};
