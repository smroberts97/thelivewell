import React, { Component } from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

export default class Header extends Component {
    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <Link to='/' 
                        className='homeLink'
                    >
                        <Typography 
                            variant="h6"
                            color="secondary">
                            the live well
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
        )
    }
}