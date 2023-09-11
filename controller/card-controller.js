const path = require("path");
const { catchAsync } = require("../utils/catchAsync");
const cardServices = require("../services/card-services");
const helpers = require("../helpers/index");
const Card = require("../models/card-model");

// Save debit card details
exports.createCard = async (req, res) => {
  try {
    const { userId, CVV, expiryDate, secureCode } = req.body;

    // setup the card services
    await cardServices.saveDebitCard(userId, CVV, expiryDate, secureCode);
    res.status(201).json(helpers.sendSuccess("Debit card has been successfully saved", 201));
  } catch (error) {
    if (error.status)
      return res
        .status(error.status)
        .json(helpers.sendError(error.message, error.status));
  }
};

exports.getAllCards = catchAsync(async (req, res, next) => {
  try {
    // Get all articles here
    const card = await Card.find();
    res.status(200).json({
      status: "success",
      data: { card },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error,
    });
  }
});

exports.getOneCard = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;

    // Get the article here
    const card = await Card.findById(id);
    res.status(200).json({
      status: "success",
      data: { card },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error,
    });
  }
});

exports.updateCard = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;

    // Update the article here

    const card = await Card.findByIdAndUpdate(id, req.body);
    res.status(200).json({
      status: "Updated successfully",
      data: { card },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error,
    });
  }
});
