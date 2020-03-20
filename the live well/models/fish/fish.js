const mongoose = require('../connection.js')

const FishSchema = mongoose.Schema({
  fishSpecies: String,
  fishLocation: String,
  fishComment: String
})

const FishCollection = mongoose.model('Fish', FishSchema)

const getAllFish = () => {
  return FishCollection.find({})
}

const getFishById = (fishId) => {
  return FishCollection.findById(fishId)
}

const addNewFish = (newFish) => {
  return FishCollection.create(newFish)
}


const updateCurrentFish = (fishId, updatedFish) => {
  return FishCollection.updateOne({ _id: fishId }, updatedFish)
}

const deleteCurrentFish = (fishId) => {
  return FishCollection.deleteOne({ _id: fishId })
}


module.exports = {
  getAllFish,
  getFishById,
  addNewFish,
  updateCurrentFish,
  deleteCurrentFish
}