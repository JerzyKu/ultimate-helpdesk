const Asset = require("../models/Asset");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @desc Create asset
// @route POSt  /assets
// @access Private
const createNewAsset = asyncHandler(async (req, res) => {
  const { name, invSymbol, userID, serialNumber } = req.body;

  //confirm data
  if (!name || !invSymbol) {
    return res
      .status(400)
      .json({ message: "Name and inventory symbol are required." });
  }

  // const assetObj = { name, invSymbol, ownerID: userID };
  const assetObj = { name, invSymbol, serialNumber };
  if (userID) {
    assetObj.ownerID = userID;
  }

  //   console.log(`assetObj`, assetObj);

  const asset = await Asset.create(assetObj);

  if (asset) {
    res
      .status(201)
      .json({ message: `New Asset Created: ${name} / ${invSymbol}` }); // 201 - created
  } else {
    res.status(400).json({ message: "Invalid data" }); // 400 - badrequest
  }
});

// @desc get all assets
// @route GET  /assets
// @access Private
const getAllAssets = async (req, res) => {
  const assets = await Asset.find();
  if (!assets) return res.status(204).json({ message: "no Assets found." });
  res.json(assets);
};

// @desc get asset by id
// @route get  /assets/{id}
// @access Private
const getAsset = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: `ID parametr is required.` });
  }
  try {
    const asset = await Asset.findOne({ _id: req.params.id });
    console.log("asset: ", asset);
    if (!asset) {
      // res.status(204).json({ "message": `No asset maches: ${req.params.id}.` })
      res.sendStatus(204);
      // return res.json({ "message": `No asset maches: ${req.params.id}.` }).status(204)
    }
    res.json(asset);
  } catch (error) {
    res.status(400).json(error);
  }
};

// @desc update asset
// @route PATCH  /assets
// @access Private
const updateAsset = async (req, res) => {
  // console.log(req.body);
  if (!req?.body?.id) {
    return res.status(400).json({ message: `ID parametr is required.` });
  }
  const asset = await Asset.findOne({ _id: req.body.id });
  if (!asset) {
    return res
      .status(400)
      .json({ message: `No asset maches: ${req.body.id}.` });
  }
  if (req.body?.name) asset.name = req.body.name;
  if (req.body?.invSymbol) asset.invSymbol = req.body.invSymbol;
  if (req.body?.serialNumber) asset.serialNumber = req.body.serialNumber;
  if (req.body?.ownerID) {
    if (req.body?.ownerID === "none") {
      asset.ownerID = undefined;
    } else {
      asset.ownerID = req.body.ownerID;
    }
  }
  const result = await asset.save();
  res.json(result);
};

// @desc delete asset
// @route DELETE  /assets
// @access Private
const deleteAsset = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: `ID parametr is required.` });
  }
  const asset = await Asset.findOne({ _id: req.params.id });
  if (!asset) {
    return res
      .status(400)
      .json({ message: `No asset maches: ${req.params.id}.` });
  }
  if(asset?.ownerID){
    return res
      .status(400)
      .json({ message: `Cannot delete issued asset.` });
  }
  const result = await Asset.deleteOne({ _id: req.params.id });
  // res.json(result);
  res.json(asset);
};

// @desc update asset
// @route PATCH  /assets/issue
// @access Private
const issueAsset = asyncHandler (async (req, res) => {
  if (!req?.body?.assetId || !req?.body?.userId ) {
    return res.status(400).json({ message: `ID parametr is required.` });
  }

  const asset = await Asset.findOne({ _id: req.body.assetId });
  if (!asset) {
    return res
      .status(400)
      .json({ message: `No asset maches: ${req.body.assetId}.` });
  }

  const user = await User.findOne({ _id: req.body.userId });
  if (!user) {
    return res
      .status(400)
      .json({ message: `No user maches: ${req.body.userId}.` });
  }

  asset.ownerID = req.body.userId;

  const result = await asset.save();
  res.json(result);
})

const unissueAsset = asyncHandler( async (req, res) => {
  if (!req?.body?.id ) {
    return res.status(400).json({ message: `ID parametr is required.` });
  }

  const asset = await Asset.findOne({ _id: req.body.id });
  if (!asset) {
    return res
      .status(400)
      .json({ message: `No asset maches: ${req.body.id}.` });
  }

  asset.ownerID = undefined

  const result = await asset.save();
  res.json(result);
})

module.exports = {
  createNewAsset,
  getAllAssets,
  updateAsset,
  getAsset,
  deleteAsset,
  issueAsset,
  unissueAsset
};
