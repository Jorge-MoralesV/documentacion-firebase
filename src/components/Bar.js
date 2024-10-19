import React, { Component } from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../context/AuthContext';
import { Source } from '@mui/icons-material';

export class Bar extends Component {

    static contextType = AuthContext;

    handleLogout = async () => {
        const { logout } = this.context;
        try {
            await logout();
        } catch (error) {
            console.log(error);
        }
    }

    render() {

        const { showLogout } = this.props;

        return (
            <AppBar position="fixed" color="primary">
                <Toolbar>
                    <Source className='me-2' fontSize='large'></Source>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Carga de archivos
                    </Typography>
                    {showLogout && (
                        <IconButton onClick={this.handleLogout}>
                            <LogoutIcon fontSize='large' color='white'></LogoutIcon>
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>
        )
    }
}

export default Bar;