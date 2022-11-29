import React from "react";
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';


function Header2(props) {
    return (
        <div>
            <AppBar position="static">
                <Container maxWidth="xl"> 
                    <Toolbar disableGutters>
                        
                    </Toolbar>    
                </Container>
            </AppBar>
        </div>
    );
}

export default Header2;