const express = require("express");
const userController = require("../controllers/bank.controller");
const router = express.Router();


router.get("/", (req, res) => {
  userController.getAllUsers(req, res);
})
  .post("/", (req, res) => {
    userController.addNewUser(req, res);
  })
  .put("/updateUser/:id", (req, res) => {
    userController.updateUser(req, res);
  })
  .put("/updateCredit", (req, res) => {
    userController.updateCredit(req, res);
  })
  .put("/deposit", (req, res) => {
    userController.updateMoney(req, res);
  })
  .put("/withDrawMoney", (req, res) => {
    userController.withDrawMoney(req, res);
  })
  .put("/Transferring", (req, res) => {
    userController.Transferring(req, res);
  })
  .delete("/:id", (req, res) => {
    userController.deleteUser(req, res);
  });



module.exports = router;



