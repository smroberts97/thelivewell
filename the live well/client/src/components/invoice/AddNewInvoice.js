import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


export default class AddNewInvoice extends Component {
    state = {
        newInvoiceAmount: '',
        newInvoiceDateOfService: '',
        newInvoiceNotes: '',
        newInvoiceCustomerId: this.props.match.params.customerId
    }

    componentDidMount() {
        console.log('We Here!')
        console.log(this.props.match.params.customerId)
    }

    creatNewInvoice = () => {
        const newInvoice = {
            amount: this.state.newInvoiceAmount,
            dateOfService: this.state.newInvoiceDateOfService,
            notes: this.state.newInvoiceNotes,
            customerId: this.state.newInvoiceCustomerId
        }
        axios.post('/api/invoice', newInvoice)
    }

    onNewInvoiceAmount = (event) => {
        const newInvoiceAmount = event.target.value;
        this.setState({ newInvoiceAmount })
    }

    onNewInvoiceDateOfService = (event) => {
        const newInvoiceDateOfService = event.target.value;
        this.setState({ newInvoiceDateOfService })
    }

    onNewInvoiceNotes = (event) => {
        const newInvoiceNotes = event.target.value;
        this.setState({ newInvoiceNotes })
    }

    render() {
        return (
            <div className="form-container">
                <h2>Add New Invoice</h2>
                <form>
                    <input
                        type='number'
                        placeholder='Invoice Amount'
                        name="newInvoiceAmount"
                        required="required"
                        onChange={this.onNewInvoiceAmount}
                        value={this.state.newInvoiceAmount}
                    />
                    <input
                        type='date'
                        placeholder='Invoice Date'
                        name="newInvoiceDateOfService"
                        required="required"
                        onChange={this.onNewInvoiceDateOfService}
                        value={this.state.newInvoiceDateOfService}
                    />
                    <input type='text'
                        placeholder='Notes'
                        name="newInvoiceNotes"
                        required="required"
                        onChange={this.onNewInvoiceNotes}
                        value={this.state.newInvoiceNotes}
                    />
                    <input
                        type='submit'
                        onClick={() => this.creatNewInvoice()}
                    />
                </form>
                <br />
                <br />
                <Link to='/'>Home</Link>
            </div>
        )
    }
}