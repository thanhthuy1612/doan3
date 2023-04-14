const loginController = require("../controller/loginController");
const verifyToken = require("../middleware/auth");

const router = require("express").Router();

router.post("/", loginController.login);
router.get("/user", loginController.get);
router.delete("/user/:id", loginController.deleteUser);
router.post("/token", loginController.postToken);
router.delete("/", verifyToken, loginController.delete);

module.exports = router;
