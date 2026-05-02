import { AppBar, Container, CssBaseline, Toolbar, Typography } from '@mui/material'
import './App.css'
import TrainingList from './components/TrainingList'
import CustomerList from './components/CustomerList'

function App() {

  return (
    <>
      <Container>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6'>Personal trainer app</Typography>
          </Toolbar>
        </AppBar>
        <TrainingList />
        <CustomerList />
        <CssBaseline />
      </Container>
    </>
  )
}

export default App
