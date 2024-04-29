const express = require("express");
const router = express.Router();
const { lessonController } = require("../controllers/index.js");
router.post("/", lessonController.insertLessons);
router.put("/", lessonController.updateLessons);
router.get("/", lessonController.findLessons);
module.exports = router;
