const userRepository = require("../repositories/user-repository");
const cardRepository = require("../repositories/card-repository");
const helpers = require("../helpers/index");

const saveDebitCard = async (userId, CVV, expiryDate, secureCode) => {
  const user = await userRepository.getUserByID(userId);

  if (!user) return helpers.newError("User does not exist", 404);

  if (user.isVerified == false)
    return helpers.newError("User is not yet verified.", 401);

  if(user.card !== null)
    return helpers.newError("You have registered your card already", 403)

  const debitCard = await cardRepository.saveDebitCard(
    CVV,
    expiryDate,
    secureCode
  );
  await userRepository.updateUserProfile(user.email, { card: debitCard._id });
};

module.exports = {
  saveDebitCard,
};
