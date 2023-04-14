const { User, Account } = require("../model/model");

const jwt = require("jsonwebtoken");
const ethers = require("ethers");
const dotenv = require("dotenv");
dotenv.config();

const generateTokens = (payload) => {
  const { wallet } = payload;
  try {
    const accessToken = jwt.sign({ wallet }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10h",
    });
    const refreshToken = jwt.sign(
      { wallet },
      process.env.ACCESS_TOKEN_SECRET_REFRESH,
      {
        expiresIn: "10h",
      }
    );
    return { accessToken, refreshToken };
  } catch (err) {
    console.log(err);
  }
};

const updateRefresh = async (wallet, refreshToken) => {
  try {
    await Account.findByIdAndUpdate(wallet._id, {
      $set: { refreshToken: refreshToken },
    });
  } catch (err) {
    console.log(err);
  }
};

const loginController = {
  login: async (req, res) => {
    const verify = ethers.utils.verifyMessage("Login", req.body.sign);
    const account = await Account.find({ wallet: verify });
    if (!account[0]) {
      try {
        const account = new Account({ wallet: verify });
        const saveAccount = await account.save();
        const tokens = generateTokens(saveAccount);
        updateRefresh(saveAccount, tokens.refreshToken);
        res.status(200).json(saveAccount);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      try {
        const tokens = generateTokens(account[0]);
        updateRefresh(account[0], tokens.refreshToken);
        res.status(200).json(account[0]);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  },
  get: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  postToken: async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ status: "false get token" });
    }

    const account = await User.find({ refreshToken: refreshToken });
    if (!account) return res.status(401).json({ status: "false get account" });
    try {
      jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SECRET_REFRESH);
      const tokens = generateTokens(account[0]);
      updateRefresh(account[0], tokens.refreshToken);
      res.status(200).json(tokens);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  delete: async (req, res) => {
    try {
      const account = await Account.find({ wallet: req.wallet });
      updateRefresh(account[0], null);
      res.status(200).json("success");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("success");
    } catch (err) {
      res.status(200).json(err);
    }
  },
};
module.exports = loginController;
