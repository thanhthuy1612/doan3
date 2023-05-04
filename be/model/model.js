const mongoose = require("mongoose");

const accountScheme = new mongoose.Schema({
  username: {
    type: String,
  },
  bio: {
    type: String,
  },
  email: {
    type: String,
  },
  walletAddress: {
    type: String,
  },
  banner: {
    type: String,
  },
  ava: {
    type: String,
  },
  wallet: {
    type: String,
    require: true,
  },
  timeJoin: {
    type: Date,
  },
  refreshToken: {
    type: String,
  },
  pictures: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Picture",
    },
  ],
});

const pictureScheme = new mongoose.Schema({
  url: {
    type: String,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
});

let Account = mongoose.model("Account", accountScheme);
let Picture = mongoose.model("Picture", pictureScheme);

module.exports = { Account, Picture };
