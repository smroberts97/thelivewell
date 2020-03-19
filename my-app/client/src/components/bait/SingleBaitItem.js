import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

export default class SingleBaitItem extends Component {
    state = {
        updatedBait: {
            bait: '',
            brand: '',
            type: '',
            color: '',
            customerId: ''
        },
        allCustomers: [],
        holderOfPiece: ''

    }


    componentDidMount() {
        this.refreshItem()
    }

    refreshItem = () => {
        const item = this.props.match.params.inventoryId
        let updatedItem
        let allCustomers
        let holderOfPiece

        axios.get(`/api/bait/${item}`)
            .then((res) => {
                updatedItem = res.data
                axios.get('/api/customer')
                    .then((res) => {
                        allCustomers = res.data
                        if (updatedItem.customerId !== '') {
                            for (let i = 0; i < allCustomers.length; i++) {
                                if (updatedItem.customerId === allCustomers[i]._id) {
                                    holderOfPiece = allCustomers[i]
                                }
                            }
                        } else {
                            holderOfPiece = ''
                        }
                        this.setState({
                            updatedBait: updatedBait,
                            allCostumers: allCustomers,
                            holderOfPiece: holderOfPiece
                        })
                    })
            })


    }

    onUpdateBait = (event) => {
        event.preventDefault()
        const baitId = this.state.updatedBait._id
        axios.put(`/api/bait/${baitId}`, this.state.updatedBait)
    }

    onNewBaitBaitChange = (event) => {
        const newBaitBait = event.target.value
        const previousState = { ...this.state }
        previousState.updatedBait.bait = newBaitBait
        this.setState(previousState)
    }

    onNewBaitBrandChange = (event) => {
        const newBaitBrand = event.target.value
        const previousState = { ...this.state }
        previousState.updatedBait.brand = newBaitBrand
        this.setState(previousState)
    }

    onNewBaitTypeChange = (event) => {
        const newBaitType = event.target.value
        const previousState = { ...this.state }
        previousState.updatedBait.type = newBaitType
        this.setState(previousState)
    }

    onNewBaitColorChange = (event) => {
        const newBaitColor = event.target.value
        const previousState = { ...this.state }
        previousState.updatedBait.color = newBaitColor
        this.setState(previousState)
    }

    onNewCustomerHoldChange = (event) => {
        const newCustomerHold = event.target.value
        const previousState = { ...this.state }
        if (newCustomerHold === '--Assign To Client--') {
            previousState.holderOfPiece = ''
            this.setState(previousState)
        } else {
            previousState.updatedBait.customerId = newCustomerHold
            this.setState(previousState)
            const customerId = this.state.updatedBait.customerId
            axios.get(`/api/customer/${customerId}`)
                .then((res) => {
                    this.setState({ holderOfPiece: res.data.singleCustomer })
                })
        }
    }



    render() {
        const selectedBait = this.state.updatedBait
        const customer = this.state.holderOfPiece

        return (
            <div className='singleView'>
                <h1>{selectedBait.name}</h1>
                <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="flex-start"
                >
                    <Card className='card' variant='outlined'>
                        <CardContent>
                            <Typography className='title' color="textSecondary" gutterBottom>
                                Brand:
                            </Typography>
                            <Typography variant="body1" component="p">
                                {selectedBait.brand}
                            </Typography>
                            <br />
                            <Typography className='title' color="textSecondary" gutterBottom>
                                Type:
                            </Typography>
                            <Typography variant="body1" component="p">
                                {selectedBait.type}
                            </Typography>
                            <br />
                            <Typography className='title' color="textSecondary" gutterBottom>
                                Color:
                            </Typography>
                            <Typography variant="body1" component="p">
                                {selectedBait.color}
                            </Typography>
                        </CardContent>
                    </Card>
                    {this.state.holderOfPiece ? 
                    <Card className='card' variant='outlined'>
                        <CardContent>
                            <Typography className='title' color="textSecondary" gutterBottom>
                                Current Holder:
                            </Typography>
                            <Typography variant="h5" component="h2">
                                <Link to={`/customer/${customer._id}`}>{customer.firstName} {customer.lastName}</Link>
                            </Typography>
                        </CardContent>
                    </Card>
                    : null
                    }
                    
                </Grid>
                <div className="form-container">
                    <form onSubmit={this.onUpdateBait}>
                        <input
                            type='text'
                            name="newBaitName"
                            required="required"
                            onChange={this.onNewBaitBaitChange}
                            value={this.state.updatedBait.bait}
                        />
                        <input
                            type='text'
                            name="newBaitBrand"
                            required="required"
                            onChange={this.onNewBaitBrandChange}
                            value={this.state.updatedBait.brand}
                        />
                        <input
                            type='text'
                            name="newBaitType"
                            required="required"
                            onChange={this.onNewBaitTypeChange}
                            value={this.state.updatedBait.type}
                        />
                        <input
                            type='text'
                            name="newBaitColor"
                            required="required"
                            onChange={this.onNewBaitColorChange}
                            value={this.state.updatedBait.color}
                        />
                        <select
                            onChange={this.onNewCustomerHoldChange}
                        >
                            <option
                            >--Assign To Client--</option>

                            {this.state.allCustomers.map((customer) => {
                                return (
                                    <option
                                        key={customer._id}
                                        value={customer._id}
                                    >{customer.firstName} {customer.lastName}</option>
                                )
                            })}
                        </select>
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