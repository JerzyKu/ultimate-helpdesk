const Asset = require('../model/Asset')

const createNewAsset = async (req, res) => {
    if (!req?.body?.name || !req?.body?.invSymbol) {
        return res.status(400).json({ 'message': 'Name and inventory symbol are required.' });
    }
    try {
        const result = await Asset.create({
            name: req.body.name,
            invSymbol: req.body.invSymbol
        })
        res.status(201).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

const getAllAssets = async (req, res) => {
    const assets = await Asset.find()
    if (!assets) return res.status(204).json({ "message": "no Assets found." })
    res.json(assets)
}

const getAsset = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ "message": `ID parametr is required.` });
    }
    try {
        const asset = await Asset.findOne({ _id: req.params.id })
        console.log('asset: ', asset);
        if (!asset) {
            // res.status(204).json({ "message": `No asset maches: ${req.params.id}.` })
            res.sendStatus(204)
            // return res.json({ "message": `No asset maches: ${req.params.id}.` }).status(204)
        }
        res.json(asset);
        
    } catch (error) {
        res.status(400).json(error)
    }
}

const updateAsset = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ "message": `ID parametr is required.` });
    }
    const asset = await Asset.findOne({ _id: req.body.id })
    if (!asset) {
        return res.status(400).json({ "message": `No asset maches: ${req.body.id}.` })
    }
    if (req.body?.name) asset.name = req.body.name;
    if (req.body?.invSymbol) asset.invSymbol = req.body.invSymbol;
    const result = await asset.save()
    res.json(result);
}

const deleteAsset = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ "message": `ID parametr is required.` });
    }
    const asset = await Asset.findOne({ _id: req.body.id })
    if (!asset) {
        return res.status(400).json({ "message": `No asset maches: ${req.body.id}.` });
    }
    const result = await Asset.deleteOne({ _id: req.body.id })
    // console.log("🚀 ~ file: employeesController.js:50 ~ deleteEmployee ~ result:", result)
    res.json(result);
}

module.exports = {
    createNewAsset,
    getAllAssets,
    updateAsset,
    getAsset,
    deleteAsset
}