const express = require('express')

const fishApi = require('../../models/fish/fish.js')

const inventoryApi = require('../../models/inventory/inventory.js')

const invoiceApi = require('../../models/invoice/invoice.js')

const fishRouter = express.Router()


//Get All
fishRouter.get('/', (req, res) => {
  fishApi.getAllFish()
    .then((allFish) => {
      res.json(allFish)
    })
})

//Get One
fishRouter.get('/:fishId', (req, res) => {
  fishApi.getFishById(req.params.fishId)
    .then((singleFish) => {
        inventoryApi.getAllInventoryByFishId(req.params.fishId)
          .then((heldItem) => {
            invoiceApi.getAllInvoicesByFishId(req.params.fishId)
              .then((fishInvoice) => {
                res.json({singleFish, heldItem, fishInvoice})
              })
          })
      })
})

//Create One
fishRouter.post('/', (req, res) => {
  fishApi.addNewFish(req.body) 
    .then((newFish) => {
      res.json(newFish)
    })
})

//Update One
fishRouter.put('/:fishId', (req, res) => {
  fishApi.updateCurrentFish(req.params.fishId, req.body)
    .then((oneFish) => {
      res.json(oneFish)
    }) 
})

//Delete One
fishRouter.delete('/:fishId', (req, res) => {
  fishApi.deleteCurrentFish(req.params.fishId)
    .then((deletedFish) => {
      res.json(deletedFish)
    })
})


module.exports = {
  fishRouter
}