import { AppBar, Container, CssBaseline, Toolbar, Typography } from '@mui/material'
import './App.css'
import TrainingList from './components/TrainingList'

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
        <CssBaseline />
      </Container>
    </>
  )
}

export default App
