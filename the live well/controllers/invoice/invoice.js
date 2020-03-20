const express = require('express')

const invoiceApi = require('../../models/invoice/invoice.js')

const invoiceRouter = express.Router()


//Get All
invoiceRouter.get('/', (req, res) => {
  invoiceApi.getAllInvoices()
    .then((allInvoices) => {
      res.json(allInvoices)
    })
})

//Get One
invoiceRouter.get('/:invoiceId', (req, res) => {
  invoiceApi.getInvoiceById(req.params.invoiceId)
    .then((singleInvoice) => {
      res.json(singleInvoice)
    })
})

//Create One
invoiceRouter.post('/', (req, res) => {
  invoiceApi.addNewInvoice(req.body)
    .then((newInvoice) => {
      res.json(newInvoice)
    })
})

//Update One
invoiceRouter.put('/:invoiceId', (req, res) => {
  invoiceApi.updateCurrentInvoice(req.params.invoiceId, req.body)
    .then((oneInvoice) => {
      res.json(oneInvoice)
    }) 
})

//Delete One
invoiceRouter.delete('/:invoiceId', (req, res) => {
  invoiceApi.deleteCurrentInvoice(req.params.invoiceId)
    .then((deletedInvoice) => {
      res.json(deletedInvoice)
    })
})


module.exports = {
  invoiceRouter
}