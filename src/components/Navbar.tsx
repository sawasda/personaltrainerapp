import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <AppBar position="static" sx={{ backgroundColor: "#305b86" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">
                    Personal Trainer App
                </Typography>

                <Box>

                    <Button
                        color="inherit"
                        component={Link}
                        to="/"
                    >
                        Home
                    </Button>

                    <Button
                        color="inherit"
                        component={Link}
                        to="/customers"
                    >
                        Customers
                    </Button>

                    <Button
                        color="inherit"
                        component={Link}
                        to="/trainings"
                    >
                        Trainings
                    </Button>
                    
                    <Button
                        color="inherit"
                        component={Link}
                        to="/calendar"
                    >
                        Calendar
                    </Button>

                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;