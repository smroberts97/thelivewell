import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'

export default class BaitCard extends Component {
    render() {
        return (
            <Card className='card' variant="outlined">
                <CardContent>
                    <Typography className='title' color="textSecondary" gutterBottom>
                        Lure or Bait Used
                    </Typography>
                    <Typography variant="h5" component="h2">
                        <Link to={this.props.itemLink}>
                            {this.props.bait}
                        </Link>
                    </Typography>
                    <Typography className='pos' color="textSecondary">
                        Lure Brand or Bait Species:
                    </Typography>
                    <Typography variant="body1" component="p">
                        {this.props.brand}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button 
                        size="small"
                        onClick={this.props.deleteItem}
                        >Delete Bait</Button>
                </CardActions>
            </Card> 
        )
    }
}