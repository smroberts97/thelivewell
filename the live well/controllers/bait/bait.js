const express = require('express')

const baitApi = require('../../models/bait/bait.js')

const baitRouter = express.Router()


//Get All
baitRouter.get('/', (req, res) => {
  baitApi.getAllBait()
    .then((allBait) => {
      res.json(allBait)
    })
})

//Get One
baitRouter.get('/:baitId', (req, res) => {
  baitApi.getBaitById(req.params.baitId)
    .then((singleBait) => {
      res.json(singleBait)
    })
})

//Create One
baitRouter.post('/', (req, res) => {
  baitApi.addNewBait(req.body)
    .then((newPiece) => {
      res.json(newPiece)
    })
})

//Update One
baitRouter.put('/:baitId', (req, res) => {
  baitApi.updateCurrentBait(req.params.baitId, req.body)
    .then((oneBait) => {
      res.json(oneBait)
    })
})

//Delete One
baitRouter.delete('/:baitId', (req, res) => {
  baitApi.deleteCurrentBait(req.params.baitId)
    .then((deletedBait) => {
      res.json(deletedBait)
    })
})


module.exports = {
  baitRouter
}