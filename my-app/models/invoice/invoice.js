const mongoose = require('../connection.js')

const InvoiceSchema = new mongoose.Schema({
    amount: Number,
    dateOfService: Date,
    notes: String,
    paymentConfirmed: Boolean,
    customerId: mongoose.Types.ObjectId
})

const InvoiceCollection = mongoose.model('Invoice', InvoiceSchema)

const getAllInvoices = () => {
    return InvoiceCollection.find({})
}

const getInvoiceById = (invoiceId) => {
    return InvoiceCollection.findById(invoiceId)
}

const getAllInvoicesByFishId = (fishId) => {
    return InvoiceCollection.find({ fishId: fishId })
}

const addNewInvoice = (newInvoice) => {
    return InvoiceCollection.create(newInvoice)
}


const updateCurrentInvoice = (invoiceId, updatedInvoice) => {
    return InvoiceCollection.updateOne({ _id: invoiceId }, updatedInvoice)
}

const deleteCurrentInvoice = (invoiceId) => {
    return InvoiceCollection.deleteOne({ _id: invoiceId })
}


module.exports = {
    getAllInvoices,
    getInvoiceById,
    getAllInvoicesByFishId,
    addNewInvoice,
    updateCurrentInvoice,
    deleteCurrentInvoice
}