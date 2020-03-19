import React, { Component } from 'react'
import axios from 'axios'
import InvoiceCard from '../cards/InvoiceCard'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


export default class EveryInvoice extends Component {
    state = {
        invoiceList: [],
        paidFilteredList: [],
        clientFilteredList: [],
        filteredList: [],
        customerList: []
    }

    componentDidMount() {
        this.refreshInvoice()
    }

    refreshInvoice = () => {
        axios.get('/api/invoice')
            .then((res) => {
                this.setState({ invoiceList: res.data, filteredList: res.data, paidFilteredList: res.data, clientFilteredList: res.data })
            })
        axios.get('/api/customer')
            .then((res) => {
                this.setState({ customerList: res.data })
            })
    }

    diffArr = (array1, array2) => {
        let smallArr = []
        let bigArr = []
        let simValues = []
        
        if (array1.length === array2.length) {
          smallArr = array1
          bigArr = array2
        }
        if (array1.length < array2.length) {
          smallArr = array1
          bigArr = array2
        } 
        if (array1.length > array2.length) {
          smallArr = array2
          bigArr = array1
        }
        for (let i = 0; i < smallArr.length; i++) {
          for (let j = 0; j < bigArr.length; j++) {
            if(smallArr[i] === bigArr[j]) {
              simValues.push(bigArr[j])
            } else {
            }
          }
        }
        return simValues
    }

    onInvoiceDeleteClick = (invoiceId) => {
        axios.delete(`/api/invoice/${invoiceId}`)
            .then(() => {
                this.refreshInvoice()
            })
    }

    handlePaidChange = (e) => {
        let currentList = []
        let newList = []
        let allSelected
        if (e.target.value === 'paid') {
            allSelected = false
            currentList = this.state.invoiceList
            newList = currentList.filter((item) => {
                return item.paymentConfirmed === true
            })
        }
        if (e.target.value === 'unpaid') {
            allSelected = false
            currentList = this.state.invoiceList
            newList = currentList.filter((item) => {
                return item.paymentConfirmed !== true
            })
        }
        if (e.target.value === 'both') {
            allSelected = true
            newList = this.state.invoiceList
        }
        let clientFilter = this.state.clientFilteredList
        let combinedFiltered = this.diffArr(newList, clientFilter)
        this.setState({ paidFilteredList: newList, filteredList: combinedFiltered, bothSelected: allSelected })
    }

    handleClientNameSelect = (e) => {
        let currentList = []
        let newList = []
        let allSelected
        if (e.target.value !== '') {
            allSelected = false
            currentList = this.state.invoiceList
            newList = currentList.filter((invoice) => {
                return invoice.customerId === e.target.value
            })
        } else {
            allSelected = true
            newList = this.state.invoiceList
        }
        let paidFilter = this.state.paidFilteredList
        let combinedFiltered = this.diffArr(newList, paidFilter)
        this.setState({ clientFilteredList: newList, filteredList: combinedFiltered, allClientShowing: allSelected })
    }

    onResetFilterClick = (e) => {
        let resetList = this.state.invoiceList
        this.setState({ filteredList: resetList })
    }


    render() {
        return (
            <div className='allCards'>
                <br />
                <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="center"
                >
                    <FormControl component="fieldset" >
                        <FormLabel component="legend">Show:</FormLabel>
                        <RadioGroup defaultValue="both" onChange={this.handlePaidChange}>
                            <FormControlLabel value="paid" control={<Radio />} label="Paid" />
                            <FormControlLabel value="unpaid" control={<Radio />} label="Unpaid" />
                            <FormControlLabel value="both" control={<Radio />} label="All" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="client-native-helper">Client</InputLabel>
                        <NativeSelect
                            onChange={this.handleClientNameSelect}
                            >
                            <option value="" />
                            {this.state.customerList.map((client) => {
                                const clientId = client._id
                                return (
                                    <option value={clientId} key={clientId}>{client.firstName} {client.lastName}</option>
                                )
                            })}
                        </NativeSelect>
                        <FormHelperText>Filter by client.</FormHelperText>
                    </FormControl>
                </Grid>
                <br />
                {this.state.filteredList.map((invoice) => {
                    const linkId = `/all-invoices/${invoice._id}`
                    const invoiceId = invoice._id
                    return (
                        <div
                            key={invoice._id}>

                            <InvoiceCard
                                note={invoice.notes}
                                invoiceLink={linkId}
                                amount={invoice.amount}
                                deleteInvoice={() => this.onInvoiceDeleteClick(invoiceId)}
                                customerId={invoice.customerId}
                                paid={invoice.paymentConfirmed}
                            />
                            <br />
                        </div>
                    )
                })}
            </div>
        )
    }
}