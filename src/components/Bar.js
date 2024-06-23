import React, { Component } from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'
import logo from '../assets/img/icon.png'

export class Bar extends Component {
    render() {
        return (
            <AppBar position="fixed" color="primary">
                <Toolbar>
                    <img src={logo} className='me-3' width='40px' alt='logo'></img>
                    <Typography variant="h6">
                        Carga de archivos
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Bar