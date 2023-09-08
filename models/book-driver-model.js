const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookDriverSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "driver",
  },
  
});

const BookDriver = mongoose.model("user-booking", BookDriverSchema);

module.exports = BookDriver;
