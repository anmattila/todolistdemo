import TodoList from './TodoList'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Home from './Home';

// täällä jotta käytetään kaikissa lapsikomponenteissa

function App() {

  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h3">
            My todos
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab value="one" label="HOME" />
          <Tab value="two" label="TODOS" />
        </Tabs>
        {value === "one" && <Home />}
        {value === "two" && <TodoList />}
      </Box>
    </Container>
  )
}
export default App

// avataan command npm run dev
// return <> = react.fragment 
// renderöinti import create root