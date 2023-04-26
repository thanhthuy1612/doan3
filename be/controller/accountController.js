const { Account } = require("../model/model");

const accountController = {
  add: async (req, res) => {
    try {
      const account = new Account(req.body);
      const saveAccount = await account.save();
      res.status(200).json(saveAccount);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getAll: async (req, res) => {
    try {
      const accounts = await Account.find().populate("pictures");
      res.status(200).json(accounts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getById: async (req, res) => {
    try {
      const account = await Account.findById(req.params.id).populate(
        "pictures"
      );
      res.status(200).json(account);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getByAccount: async (req, res) => {
    try {
      const accounts = await Account.find({ wallet: req.params.wallet });
      res.status(200).json(accounts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  update: async (req, res) => {
    try {
      const account = await Account.findById(req.params.id);
      await account.updateOne({ $set: req.body });
      res.status(200).json("success");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateAva: async (req, res, next) => {
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    if (req.file.path !== null) {
      console.log(req.file);
      const account = await Account.findById(req.params.id);
      const path = req.file.filename;
      await account.updateOne({
        $set: { ava: path },
      });
      res.status(200).json({ ava: req.file.path });
      return;
    }
    return;
  },
  updateBanner: async (req, res, next) => {
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
    if (req.file.path !== null) {
      console.log(req.file);
      const account = await Account.findById(req.params.id);
      const path = req.file.filename;
      await account.updateOne({
        $set: { banner: path },
      });
      res.status(200).json({ banner: req.file.path });
      return;
    }
    return;
  },
  delete: async (req, res) => {
    try {
      await Account.updateMany({ account: req.params.id }, { account: null });
      await Account.findByIdAndDelete(req.params.id);
      res.status(200).json("success");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = accountController;
