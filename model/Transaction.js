const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: "AdoptionPet" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  status: {
    type: String,
    enum: ["PENDING", "COMPLETE", "FAILED"],
    default: "PENDING",
  },
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);
