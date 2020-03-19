import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import moment from 'moment'

export default class SingleInvoice extends Component {
    state = {

        updatedInvoice: {
            amount: '',
            dateOfService: '',
            notes: '',
            paymentConfirmed: '',
            customerId: ''
        },
        customerInfo: '',
    }

    componentDidMount() {
        this.refreshInvoice()

    }

    refreshInvoice = () => {
        const invoice = this.props.match.params.invoiceId
        axios.get(`/api/invoice/${invoice}`)
            .then((res) => {
                this.setState({ updatedInvoice: res.data })
                axios.get(`/api/customer/${this.state.updatedInvoice.customerId}`)
                    .then((res) => {
                        this.setState({ customerInfo: res.data.singleCustomer })
                    })
            })
    }

    onUpdateInvoice = (event) => {
        event.preventDefault()
        const invoiceId = this.state.updatedInvoice._id
        axios.put(`/api/invoice/${invoiceId}`, this.state.updatedInvoice)
    }

    onNewInvoiceAmountChange = (event) => {
        const newInvoiceAmount = event.target.value
        const previousState = { ...this.state }
        previousState.updatedInvoice.amount = newInvoiceAmount
        this.setState(previousState)
    }

    onNewInvoiceDateChange = (event) => {
        const newInvoiceDate = event.target.value
        const previousState = { ...this.state }
        previousState.updatedInvoice.dateOfService = newInvoiceDate
        this.setState(previousState)
    }

    onNewInvoiceNoteChange = (event) => {
        const newInvoiceNote = event.target.value
        const previousState = { ...this.state }
        previousState.updatedInvoice.notes = newInvoiceNote
        this.setState(previousState)
    }

    onNewPaymentConfirmedChange = (event) => {
        console.log(event.target.value)
        const newPaymentConfirmed = event.target.value
        const previousState = { ...this.state }
        previousState.updatedInvoice.paymentConfirmed = newPaymentConfirmed
        this.setState(previousState)
    }

    render() {
        const selectedInvoice = this.state.updatedInvoice
        const customerInfo = this.state.customerInfo
        const customerLink = `/customer/${customerInfo._id}`

        return (
            <div className='singleView'>
                <Link to={customerLink}><h1>{customerInfo.firstName} {customerInfo.lastName}</h1></Link>
                <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="flex-start"
                >
                    <Card className='card' variant='outlined'>
                        <CardContent>
                            <Typography className='title' color="textSecondary" gutterBottom>
                                Notes:
                            </Typography>
                            <Typography variant="body1" component="p">
                                {selectedInvoice.notes}
                            </Typography>
                            <br />
                            <Typography className='title' color="textSecondary" gutterBottom>
                                Amount:
                            </Typography>
                            <Typography variant="body1" component="p">
                                {selectedInvoice.amount}
                            </Typography>
                            <br />
                            <Typography className='title' color="textSecondary" gutterBottom>
                                Date of Service:
                            </Typography>
                            <Typography variant="body1" component="p">
                                {moment(selectedInvoice.dateOfService).format('MMMM Do YYYY')}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <div className="form-container">
                    <form onSubmit={this.onUpdateInvoice}>
                        <input
                            type='number'
                            name="newInvoiceAmount"
                            required="required"
                            onChange={this.onNewInvoiceAmountChange}
                            value={this.state.updatedInvoice.amount}
                        />
                        <input
                            type='text'
                            name="newInvoiceNote"
                            required="required"
                            onChange={this.onNewInvoiceNoteChange}
                            value={this.state.updatedInvoice.notes}
                        /><span> Client Paid: </span>
                        <span>
                            <input
                                type='radio'
                                name="newPaymentConfirmed"
                                onChange={this.onNewPaymentConfirmedChange}
                                value={true}
                                checked={this.state.updatedInvoice.paymentConfirmed}
                            /> Yes
                        </span>
                        <span>
                            <input
                                type='radio'
                                name="newPaymentConfirmed"
                                onChange={this.onNewPaymentConfirmedChange}
                                value={false}
                                checked={!this.state.updatedInvoice.paymentConfirmed}
                            /> No
                        </span>
                        <br />
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