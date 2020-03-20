const mongoose = require('../connection.js')

const BaitSchema = new mongoose.Schema({
    bait: String,
    brand: String,
    type: String,
    color: String,
    fishId: mongoose.Types.ObjectId
})


const BaitCollection = mongoose.model('Bait', BaitSchema)

const getAllBait = () => {
    return BaitCollection.find({})
}

const getBaitById = (baitId) => {
    return BaitCollection.findById(baitId)
}

const getAllBaitByFishId = (fishId) => {
    return BaitCollection.find({ fishId: fishId })
}

const addNewBait = (newBait) => {
    return BaitCollection.create(newBait)
}


const updateCurrentBait = (baitId, updatedBait) => {
    return BaitCollection.updateOne({ _id: baitId }, updatedBait)
}

const deleteCurrentBait = (baitId) => {
    return BaitCollection.deleteOne({ _id: baitId })
}


module.exports = {
    getAllBait,
    getBaitById,
    getAllBaitByFishId,
    addNewBait,
    updateCurrentBait,
    deleteCurrentBait
}