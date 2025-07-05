const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const ErrorSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    userId: {
      type: String,
      required: false,
    },
    userEmail: {
      type: String,
      required: false,
    },
    errorDate: {
      type: Date,
      default: Date.now,
    },
    error: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Error", ErrorSchema);
