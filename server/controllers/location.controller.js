import { stateModel, cityModel } from '../models/location.model.js'
import mongoose from "mongoose"
import validations from '../services/validateData.js'
const ObjectId = mongoose.Types.ObjectId;

const locationControllers = {
    renderStates: async (req, res) => {
        try {
            const states = await stateModel.aggregate([
                {
                    $lookup: {
                        from: "cities",
                        localField: "_id",
                        foreignField: "stateId",
                        as: "city"
                    }
                },
                {
                    $project: {
                        'city.name': 0,
                        'city.stateId': 0,
                        'city.status': 0,
                    }
                },
                { $sort: { _id: -1 } }
            ])
            return res.render('location/states', { states })
        } catch (error) {
            console.log('renderStates : ' + error.message)
        }
    },
    renderCities: async (req, res) => {
        try {
            const states = await stateModel.find({})
            const cities = await cityModel.aggregate([
                {
                    $lookup: {
                        from: 'states',
                        localField: 'stateId',
                        foreignField: '_id',
                        as: 'state'
                    }
                },
                { $unwind: '$state' },
                { $sort: { _id: -1 } }
            ])
            return res.render('location/cities', { states, cities })
        } catch (error) {
            console.log('renderStates : ' + error.message)
        }
    },
    createState: async (req, res) => {
        try {
            const { name } = req.body;
            const existingstate = await stateModel.findOne({ name })

            if (existingstate) {
                return res.json({ warning: 'State Exists!' })
            } else {
                const response = await stateModel.create({ name })
                if (!response) return res.json({ error: 'Failed!' })
                return res.status(200).json({ navigator: 'location/states' })
            }
        } catch (error) {
            console.log('createState : ' + error.message)
            if (error.name === 'ValidationError') validations(res, error.errors)
        }
    },
    getSingleState: async (req, res) => {
        try {
            const response = await stateModel.findById({ _id: req.params.id })
            if (!response) return res.json({ error: 'State Not Found!' })
            return res.status(200).json(response)
        } catch (error) {
            console.log('getState : ' + error.message)
        }
    },
    updateState: async (req, res) => {
        try {
            const { name } = req.body;
            const response = await stateModel.findByIdAndUpdate(
                { _id: req.params.id },
                { name }
            )
            if (!response) return res.json({ error: 'Failed to update brand' })
            return res.json({ navigator: 'location/states' })
        } catch (error) {
            console.log('updateState : ' + error.message)
        }
    },
    updateStateStatus: async (req, res) => {
        try {
            const { status } = req.body;
            const response = await stateModel.findByIdAndUpdate(
                { _id: req.params.id }, { status }, { new: true }
            )
            if (!response) return res.json({ error: 'Failed to update brand!' })
            return res.json({ message: 'update successfully!' })
        } catch (error) {
            console.log('updateStateStatus : ' + error.message)
        }
    },
    deleteState: async (req, res) => {
        try {
            const response = await stateModel.findByIdAndDelete({ _id: req.params.id })
            if (!response) return res.json({ error: 'Not Found' })
            return res.json({ message: 'Deleted successfully' })
        } catch (error) {
            console.log('deleteState : ' + error.message)
        }
    },
    createCity: async (req, res) => {
        try {
            const { name, stateId } = req.body;
            const existingcity = await cityModel.findOne({ name })

            if (existingcity) {
                return res.json({ warning: 'State Exists!' })
            } else {
                const response = await cityModel.create({ name, stateId: new ObjectId(stateId) })
                if (!response) return res.json({ error: 'Failed!' })
                return res.status(200).json({ navigator: 'location/cities' })
            }
        } catch (error) {
            console.log('createState : ' + error.message)
            if (error.name === 'ValidationError') validations(res, error.errors)
        }
    },
    getSingleCity: async (req, res) => {
        try {
            const response = await cityModel.aggregate([
                {
                    $match: {
                        _id: new ObjectId(req.params.id)
                    }
                },
                {
                    $lookup: {
                        from: 'states',
                        localField: 'stateId',
                        foreignField: '_id',
                        as: 'state'
                    }
                },
                { $unwind: '$state' }
            ])
            if (response.length == 0) return res.json({ error: 'State Not Found!' })
            return res.status(200).json(response[0])
        } catch (error) {
            console.log(' getSingleCity : ' + error.message)
        }
    },
    updateCityStatus: async (req, res) => {
        try {
            const { status } = req.body;
            const response = await cityModel.findByIdAndUpdate(
                { _id: req.params.id }, { status }, { new: true }
            )
            if (!response) return res.json({ error: 'Failed to update brand!' })
            return res.json({ message: 'update successfully!' })
        } catch (error) {
            console.log('updateCityStatus : ' + error.message)
        }
    },
    updateCity: async (req, res) => {
        try {
            const { name, stateId } = req.body;
            const response = await cityModel.findByIdAndUpdate(
                { _id: req.params.id },
                { name, stateId: new ObjectId(stateId) },
                { new: true }
            )

            if (!response) return res.json({ error: 'Failed to update brand' })
            return res.json({ navigator: 'location/cities' })
        } catch (error) {
            console.log('updateState : ' + error.message)
        }
    },
    deleteCity: async (req, res) => {
        try {
            const response = await cityModel.findByIdAndDelete({ _id: req.params.id })
            if (!response) return res.json({ error: 'Not Found' })
            return res.json({ message: 'Deleted successfully' })
        } catch (error) {
            console.log('deleteCity : ' + error.message)
        }
    },
    getlocationState: async (req, res) => {
        try {
            const response = await stateModel.find({ status: true })
            return res.status(200).json(response)
        } catch (error) {
            console.log(' : ' + error.message)
        }
    },
    getlocationCities: async (req, res) => {
        try {
            const response = await cityModel.find({ stateId: req.params.id, status: true })
            return res.status(200).json(response)
        } catch (error) {
            console.log(' : ' + error.message)
        }
    },
}

export default locationControllers