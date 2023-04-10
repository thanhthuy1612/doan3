const pictureController = require("../controller/pictureController");

const router = require("express").Router();

router.post("/", pictureController.add);

router.get("/", pictureController.getAll);
router.get("/:id", pictureController.getById);

router.put("/:id", pictureController.update);

router.delete("/:id", pictureController.delete);

module.exports = router;
