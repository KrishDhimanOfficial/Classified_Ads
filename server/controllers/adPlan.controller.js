import adPlansModel from "../models/adPlans.model.js";

const adsPlanControllers = {
    renderAllAdPlans: async (req, res) => {
        try {
            const plans = await adPlansModel.find({})
            return res.render('featureAdsPlans/adsPlans', { plans })
        } catch (error) {
            console.log('renderAllAdPlans : ' + error.message)
        }
    },
    getAllPlans: async (req, res) => {
        const response = await adPlansModel.find({})
        return res.status(200).json(response)
    },
    createAdPlan: async (req, res) => {
        try {
            const { title, plan_duration, price, discount } = req.body;
            console.log(req.body);
            const response = await adPlansModel.create({ title, plan_duration, price, discount })
            if (!response) return res.json({ error: 'Something went wrong!' })
            return res.status(200).json({ message: 'sucessfully created!' })
        } catch (error) {
            console.log('createAdPlan' + error.message)

        }
    },
    getAdPlans: async (req, res) => {
        try {
            const response = await adPlansModel.findById({ _id: req.params.id })
            if (!response) return res.json({ error: 'Not Found!' })
            return res.status(200).json(response)
        } catch (error) {
            console.log('getAdPlans' + error.message)

        }
    },
    updateAdsPlan: async (req, res) => {
        try {
            const { title, plan_duration, price, discount } = req.body;
            const response = await adPlansModel.findByIdAndUpdate(
                { _id: req.params.id },
                { title, plan_duration, price, discount },
                { new: true, runValidators: true }
            )
            if (!response) return res.json({ error: 'update failed!' })
            return res.status(200).json({ message: 'updated sucessfully!' })
        } catch (error) {
            console.log('updateAdsPlan : ' + error.message)

        }
    },
    deleteAdsPlan: async (req, res) => {
        try {
            const response = await adPlansModel.findByIdAndDelete({ _id: req.params.id })
            if (!response) return res.json({ error: 'Not Found!' })
            return res.status(200).json({ message: 'deleted sucessfully!' })
        } catch (error) {
            console.log('deleteAdsPlan : ' + error.message)
        }
    },
}

export default adsPlanControllers