const Card = require("../models/card-model");

// save your debit card
const saveDebitCard = async ( CVV, expiryDate, secureCode) => {
  const saveCard = await new Card({
    CVV,
    expiryDate,
    secureCode,
  }).save();

  return saveCard;
};

module.exports = {
  saveDebitCard,
};
