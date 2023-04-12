const { User } = require("../model/model");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

let wallets = [
  {
    id: 1,
    wallet: "1",
    refreshToken: null,
  },
  {
    id: 2,
    wallet: "2",
    refreshToken: null,
  },
];

const generateTokens = (payload) => {
  const { wallet } = payload;
  try {
    const accessToken = jwt.sign({ wallet }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "60s",
    });
    const refreshToken = jwt.sign(
      { wallet },
      process.env.ACCESS_TOKEN_SECRET_REFRESH,
      {
        expiresIn: "1h",
      }
    );
    return { accessToken, refreshToken };
  } catch (err) {
    console.log(err);
  }
};

const updateRefresh = async (wallet, refreshToken) => {
  try {
    await User.findByIdAndUpdate(wallet._id, {
      $set: { refreshToken: refreshToken },
    });
  } catch (err) {
    console.log(err);
  }
};

const loginController = {
  login: async (req, res) => {
    const account = await User.find({ wallet: req.body.wallet });
    if (!account[0]) return res.status(401).json({ status: "false" });

    try {
      const tokens = generateTokens(account[0]);
      updateRefresh(account[0], tokens.refreshToken);
      res.status(200).json(tokens);
    } catch (err) {
      res.status(500).json(err);
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
      const account = await User.find({ wallet: req.wallet });
      updateRefresh(account[0], null);
      res.status(200).json("success");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = loginController;
