import { stateModel, cityModel } from '../models/location.model.js'
import mongoose from "mongoose"
import validations from '../services/validateData.js'
const ObjectId = mongoose.Types.ObjectId;

const locationControllers = {
    renderStates: async (req, res) => {
        try {
            const states = await stateModel.find({}).sort({ _id: -1 })
            return res.render('location/states', { states })
        } catch (error) {
            console.log('renderStates : ' + error.message)
        }
    },
    renderCities: async (req, res) => {
        try {
            const cities = await cityModel.find({}).sort({ _id: -1 })
            return res.render('location/cities')
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
    updateState: async (req, res) => {
        try {
            const { name } = req.body;
            console.log(req.body);

            const response = await stateModel.findByIdAndUpdate(
                { _id: req.params.id },
                { name }
            )
            if (!response) return res.json({ error: 'Failed to update brand' })
            return res.json({ message: 'updated sucessfully!' })
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
                return res.status(200).json({ message: 'State created successfully!' })
            }
        } catch (error) {
            console.log('createState : ' + error.message)
            if (error.name === 'ValidationError') validations(res, error.errors)
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
    deleteCity: async (req, res) => {
        try {
            const response = await cityModel.findByIdAndDelete({ _id: req.params.id })
            if (!response) return res.json({ error: 'Not Found' })
            return res.json({ message: 'Deleted successfully' })
        } catch (error) {
            console.log('deleteCity : ' + error.message)
        }
    },
}

export default locationControllers