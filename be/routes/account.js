const accountController = require("../controller/accountController");

const router = require("express").Router();

router.post("/", accountController.add);

router.get("/", accountController.getAll);
router.get("/:id", accountController.getById);

router.put("/:id", accountController.update);

router.delete("/:id", accountController.delete);

module.exports = router;
