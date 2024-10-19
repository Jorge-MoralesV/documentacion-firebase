import React, { Component } from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../assets/img/icon.png'
import { getAuth, signOut } from 'firebase/auth';
import firebaseApp from '../credenciales';

export class Bar extends Component {

    handleLogout = async () => {
        const auth = getAuth(firebaseApp);
        try {
            await signOut(auth)
        } catch (error) {
            console.log(error);
        }
    }

    render() {

        const { showLogout } = this.props;

        return (
            <AppBar position="fixed" color="primary">
                <Toolbar>
                    <img src={logo} className='me-3' width='40px' alt='logo'></img>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Carga de archivos
                    </Typography>
                    {showLogout && (
                        <IconButton onClick={this.handleLogout}>
                            <LogoutIcon fontSize='large' color='dark'></LogoutIcon>
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>
        )
    }
}

export default Bar