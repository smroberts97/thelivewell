import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class BaitCard extends Component {
    state = {
        fishInfo: ''
    }

    componentDidMount() {
        this.refreshInvoice()
    }

    refreshInvoice = () => {
        const fishId = this.props.fishId
        axios.get(`/api/fish/${fishId}`)
            .then((res) => {
                this.setState({ fishInfo: res.data.singleFish })
            })
    }


render() {
    const fishInfo = this.state.fishInfo
    const isPaid = this.props.paid
    return (
        <Card className={isPaid ? 'card-paid' : 'card-not-paid'} variant="outlined">
            <CardContent>
                <Typography className='title' color="textSecondary" gutterBottom>
                    Invoice
                    </Typography>
                <Typography variant="h5" component="h2">
                    <Link to={this.props.invoiceLink}>
                        {this.props.note}
                    </Link>
                </Typography>
                <Typography className='pos' color="textSecondary">
                    Fish Caught:
                    </Typography>
                <Typography variant="body1" component="p">
                    {fishInfo.fishSpecies} {fishInfo.fishLocation}
                </Typography>
                <Typography className='pos' color="textSecondary">
                    Amount:
                    </Typography>
                <Typography variant="body1" component="p">
                    ${this.props.amount}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    onClick={this.props.deleteInvoice}
                >Delete Invoice</Button>
            </CardActions>
        </Card>
    )
}
}