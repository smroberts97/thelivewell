import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class SingleFish extends Component {

    state = {
        updatedFish: {
            fishSpecies: '',
            fishLocation: '',
            fishComment: ''
        },
        heldItems: [],
        invoiceList: []

    }

    componentDidMount() {
        this.refreshFish()
    }

    refreshFish = () => {
        const customer = this.props.match.params.fishId
        axios.get(`/api/fish/${fish}`)
            .then((res) => {
                this.setState({ updatedFish: res.data.singleFish })
                this.setState({ heldItems: res.data.heldItem })
                this.setState({ invoiceList: res.data.customerInvoice })
            })
    }

    onUpdateFish = (event) => {
        event.preventDefault()
        const uFish = this.state.updatedFish._id
        axios.put(`/api/fish/${uFish}`, this.state.updatedFish)
    }

    onNewFishSpeciesChange = (event) => {
        const newFishSpecies = event.target.value
        const previousState = { ...this.state }
        previousState.updatedFish.Species = newFishSpecies
        this.setState(previousState)
    }

    onNewFishLocationChange = (event) => {
        const newFishLocation = event.target.value
        const previousState = { ...this.state }
        previousState.updatedFish.Location = newFishLocation
        this.setState(previousState)
    }

    onNewFishCommentChange = (event) => {
        const newFishComment = event.target.value
        const previousState = { ...this.state }
        previousState.updatedFish.Comment = newFishComment
        this.setState(previousState)
    }

    render() {
        const selectedFish = this.state.updatedFish
        const addInvoiceLink = `/all-invoices/create-invoice/${selectedFish._id}`
        return (
            <div className='singleView'>
                <h1>{selectedFish.Species} {selectedFish.Location}</h1>
                <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="flex-start"
                >
                    <Card className='card' variant='outlined'>
                        <CardContent>
                            <Typography className='title' color="textSecondary" gutterBottom>
                                Comments:
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {selectedFish.Comment}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card className='card' variant='outlined'>
                        <CardContent>
                            <Typography className='title' color="textSecondary" gutterBottom>
                                Invoices:
                            </Typography>
                            <List component="nav" aria-label='invoices for client'>
                                {this.state.invoiceList.map((invoice) => {
                                    const singleInvoiceLink = `/all-invoices/${invoice._id}`
                                    return (
                                        <Link to={singleInvoiceLink} key={invoice._id}>
                                            <ListItem button>
                                                <ListItemText primary={invoice.notes} />
                                            </ListItem>
                                        </Link>
                                    )
                                })}
                            </List>
                        </CardContent>
                        <CardActions>
                            <Link to={addInvoiceLink}>
                                +
                            </Link>
                        </CardActions>
                    </Card>
                    {this.state.heldItems.length === 0 ? null :
                        <Card className='card' variant='outlined'>
                            <CardContent>
                                <Typography className='title' color="textSecondary" gutterBottom>
                                    Holding Current Items:
                            </Typography>
                                <Typography variant="body1" component="p">
                                    {this.state.heldItems.map((item) => {
                                        const singleItemLink = `/inventory/${item._id}`
                                        return (
                                            <Link key={item._id} to={singleItemLink}>
                                                <ListItem button>
                                                    <ListItemText primary={item.name} />
                                                </ListItem>
                                            </Link>
                                        )
                                    })}
                                </Typography>
                            </CardContent>
                        </Card>
                    }
                </Grid>
                <div className="form-container">
                    <form onSubmit={this.onUpdateFish}>
                        <input
                            type='text'
                            name="newFishSpecies"
                            required="required"
                            onChange={this.onNewFishSpeciesChange}
                            value={this.state.updatedFish.species}
                        />
                        <input
                            type='text'
                            name="newFishLocation"
                            required="required"
                            onChange={this.onNewFishLocationChange}
                            value={this.state.updatedFish.location}
                        />
                        <input
                            type='text'
                            name="newFishComment"
                            required="required"
                            onChange={this.onNewFishCommentChange}
                            value={this.state.updatedFish.comment}
                        />
                        <input
                            type='submit'
                            value="update"
                        />
                    </form>
                </div>
            </div>
        )
    }
}