const accountController = require("../controller/accountController");
const verifyToken = require("../middleware/auth");
const upload = require("../middleware/uploadImage");

const router = require("express").Router();

router.post("/", accountController.add);

router.get("/", accountController.getAll);
router.get("/:id", accountController.getById);
router.get("/search/:wallet", accountController.getByAccount);

router.put("/:id", accountController.update);

router.post("/:id", upload.single("ava"), accountController.postImg);

router.delete("/:id", accountController.delete);

module.exports = router;
