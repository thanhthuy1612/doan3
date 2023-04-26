const accountController = require("../controller/accountController");
const verifyToken = require("../middleware/auth");
const fileUploader = require("../middleware/uploadImage");

const router = require("express").Router();

router.post("/", accountController.add);

router.get("/", accountController.getAll);
router.get("/:id", accountController.getById);
router.get("/search/:wallet", accountController.getByAccount);

router.put("/:id", accountController.update);
router.put("/ava/:id", fileUploader.single("ava"), accountController.updateAva);
router.put(
  "/banner/:id",
  fileUploader.single("banner"),
  accountController.updateBanner
);

router.delete("/:id", accountController.delete);

module.exports = router;
