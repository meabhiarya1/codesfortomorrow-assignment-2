const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const serviceController = require("../controllers/serviceController");

router.post("/category/:categoryId/service", authenticateToken, serviceController.addService);
router.get("/category/:categoryId/services", authenticateToken, serviceController.getServices);
router.put("/category/:categoryId/service/:serviceId", authenticateToken, serviceController.updateService);
router.delete("/category/:categoryId/service/:serviceId", authenticateToken, serviceController.deleteService);

module.exports = router;
