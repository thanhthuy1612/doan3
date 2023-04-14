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
  title: {
    type: String,
  },
  img: {
    type: String,
  },
  time: {
    type: String,
  },
  price: {
    type: String,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
});

const userScheme = new mongoose.Schema({
  wallet: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
});

let Account = mongoose.model("Account", accountScheme);
let Picture = mongoose.model("Picture", pictureScheme);
let User = mongoose.model("User", userScheme);

module.exports = { Account, Picture, User };
