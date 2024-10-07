import { useState, useRef } from "react";
//import TodoTable from "./TodoTable";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the Data Grid
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import day from "dayjs";


function TodoList() {

    const [todo, setTodo] = useState({
        description: "",
        date: null,
        priority: ""
    });

    // liittyy samaan asiaan, helpompi tehdä olio kuin description ja date omina
    const [todos, setTodos] = useState([]);
    const gridRef = useRef();
 
    const [colDefs, setColDefs] = useState([
        { field: "description", filter: true, floatingFilter: true },
        {
            field: "priority", filter: true, floatingFilter: true,
            cellStyle: params => params.value === "High" ? { color: 'red' } : { color: 'black' }
        },
        { field: "date", filter: true, floatingFilter: true },
    ]);

    const handleAdd = () => {
        if (!todo.description.trim()) {     // jos null tai undefined
            alert("Write something to do");
        }
        else {
            setTodos([todo, ...todos]);
            // tallentaa taulukkoon lisätyn ja seuraava liitetään eteen ja säilyttää edellisen, käytössä flexbox
            // jälkeen saataisiin ...todos.todo
            // index -> body -> place.items -> flex-start
            // ei tallennu pelkästään stringejä vaan oliota joilla kaksi arvoa
            setTodo({ description: "", date: null, priority: "" }); // syöttöalue takaisin tyhjäksi eli tyhjentää inputin
        }
    }

    const handleDelete = () => {
        // setTodos(todos.filter((todo, index) => index != row)) 
        // todolla tietysti aina indexpaikka listassa
        // filter käy läpi rivi riviltä
        // true jos i ei sama kuin painikkeella lähetetty i = suodattaa oikean indexin

        if (gridRef.current.getSelectedNodes().length > 0) {
            setTodos(todos.filter((todo, index) =>
                index != gridRef.current.getSelectedNodes()[0].id));
        }
        else {
            alert("Select row first");
        }

    }

    const handleDateChange = (newDate) => {
        setTodo({ ...todo, date: newDate});
    }

    return (
        <>
            <Stack mt={2} direction="row" spacing={2} justifyContent="center" alignItems="center">
                <TextField
                    label="Description"
                    value={todo.description}
                    onChange={event => setTodo({ ...todo, description: event.target.value })}
                // ottaa vain descriptionin eikä kadota date, muuten tallentaa vanhan päälle/pyyhkii pois
                // sen hetkisin properteineen ja arvoineen
                // järjestyksellä ei väliä oliossa
                />
                <TextField
                    label="Priority"
                    value={todo.priority}
                    onChange={event => setTodo({ ...todo, priority: event.target.value })}
                    // select ja menu jos haluaa valita listasta
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date"
                        //defaultValue={day.js(Date.now())} 
                        value={todo.date}
                        onChange={handleDateChange}
                    />                  
                </LocalizationProvider>

                <Button variant="contained" onClick={handleAdd}>Add ToDo</Button>
                <Button variant="contained" endIcon={<DeleteIcon />} color="error"
                    onClick={handleDelete}>Delete</Button>
            </Stack>

            <div className="ag-theme-material"
                style={{ height: 500, width: 800 }}>

                <AgGridReact
                    rowData={todos}
                    columnDefs={colDefs}
                    rowSelection="single"
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                />
            </div>
        </>
    )
}

export default TodoList;

// app:n lapsikomponentti

// state tietoa ei voi suoraan siirtää millekään käsiteltäväksi
// propsit tekee tietojen välittämisen ja lähettämisen
// ei ole enää state, stateless komponentti tai functional komponentti
// samalla inputilla täsmälleen sama output, toiminta helpoo ennustaa
// testaus helppoa, varsinkin yksikkötestaus