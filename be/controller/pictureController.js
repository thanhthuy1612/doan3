const { Picture, Account } = require("../model/model");

const pictureController = {
  add: async (req, res) => {
    try {
      const picture = new Picture(req.body);
      const savePicture = await picture.save();
      if (req.body.account) {
        const account = await Account.findById(req.body.account);
        await account.updateOne({ $push: { pictures: savePicture._id } });
      }
      res.status(200).json(savePicture);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getAll: async (req, res) => {
    try {
      const pictures = await Picture.find().populate("account");
      res.status(200).json(pictures);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getById: async (req, res) => {
    try {
      const picture = await Picture.findById(req.params.id).populate("account");
      res.status(200).json(picture);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  update: async (req, res) => {
    try {
      const picture = await Picture.findById(req.params.id);
      await picture.updateOne({ $set: req.body });
      res.status(200).json("success");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  delete: async (req, res) => {
    try {
      await Picture.updateMany(
        { pictures: req.params.id },
        { $pull: { pictures: req.params.id } }
      );
      await Picture.findByIdAndDelete(req.params.id);
      res.status(200).json("success");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = pictureController;
