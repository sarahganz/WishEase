const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/users");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

//all paths start with /api/users
// POST /api/users
router.post("/", usersCtrl.create);
// POST /api/users/login
router.post("/login", usersCtrl.login);
// GET /api/users/check-token
// Insert ensureLoggedIn on all routes that need protecting
router.get("/check-token", ensureLoggedIn, usersCtrl.checkToken);
// PUT /api/users/wishlist/:itemId/achieved
router.put(
  "/wishlist/:itemId/achieved",
  ensureLoggedIn,
  usersCtrl.markAsAchieved
);
// GET /api/users/wishlist
router.get("/wishlist", ensureLoggedIn, usersCtrl.getWishlist);
// POST /api/users/wishlist
router.post("/wishlist", ensureLoggedIn, usersCtrl.addToWishlist);
// GET /api/users/achieved-wishes
router.get("/achieved-wishes", ensureLoggedIn, usersCtrl.getAchievedWishes);
// GET /api/users/achieved-wishes/:id
router.get(
  "/achieved-wishes/:id",
  ensureLoggedIn,
  usersCtrl.getAchievedWishDetails
);
// DELETE /api/users/wishlist/:itemId
router.delete(
  "/wishlist/:itemId",
  ensureLoggedIn,
  usersCtrl.deleteFromWishlist
);

module.exports = router;
