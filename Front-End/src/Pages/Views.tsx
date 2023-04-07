import { Box, Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";

interface view1Data {
    id: string,
    numroomsavailable: number,
}

export const Views = () => {
    const [view1, setView1] = useState<view1Data[]>();
    const [view2, setView2] = useState();
    const [viewSelection, setViewSelection] = useState<number>();

    const getViews = () => {
        axios.get("http://localhost:4000/View1").then((data) => {
            setView1(data.data as view1Data[]);
        });
        axios.get("http://localhost:4000/View2").then((data) => {
            setView2(data.data);
        });
    };
    useEffect(() => {
        getViews();
    }, []);

    const columns1 = [
        { field: "id", headerName: "City", width: 140 },
        { field: "numroomsavailable", headerName: "Number of Available Rooms", width: 200, }
    ];
    const columns2 = [
        { field: "name", headerName: "Chain", width: 140 },
        { field: "id", headerName: "Address", width: 400, },
        { field: "capacity", headerName: "Capacity", width: 80, }
    ];
    const handleViewChange = (event: SelectChangeEvent) => {
        setViewSelection(event.target.value as unknown as number);
    };
    
    return (
        <Container maxWidth="lg" className="mt-16 mb-20">
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                className="bg-slate- shadow-lg rounded-[3rem] pt-4 pb-4 max-w-3xl mx-auto"
            >
                <div className="mb-4">
                    <Box sx={{ minWidth: 160, maxWidth: 200 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                View Selection
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={viewSelection}
                                label="capacity"
                                onChange={handleViewChange}
                            >
                                <MenuItem value={1}>View 1</MenuItem>
                                <MenuItem value={2}>View 2</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <div>
                    {view1 && viewSelection==1 && (
                        <div style={{ width: "fit" }}>
                            <DataGrid
                                rows={view1}
                                columns={columns1}
                                autoHeight
                            />
                        </div>
                    )}
                    {view2 && viewSelection==2 && (
                        <div style={{ width: "fit" }}>
                            <DataGrid
                                rows={view2}
                                columns={columns2}
                                autoHeight
                            />
                        </div>
                    )}
                </div>
            </Grid>
        </Container>
    );
};
