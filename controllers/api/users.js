const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const Destination = require("../../models/destination");

module.exports = {
  create,
  login,
  checkToken,
  markAsAchieved,
  getWishlist,
  addToWishlist,
};

function checkToken(req, res) {
  // req.user will always be there for you when a token is sent
  console.log("req.user", req.user);
  res.json(req.exp);
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json("Bad Credentials");
  }
}

async function create(req, res) {
  try {
    // Add the user to the database
    const user = await User.create(req.body);
    // token will be a string
    const token = createJWT(user);
    // Yes, we can use res.json to send back just a string
    // The client code needs to take this into consideration
    res.json(token);
  } catch (err) {
    // Client will check for non-2xx status code
    // 400 = Bad Request
    res.status(400).json(err);
  }
}

async function markAsAchieved(req, res) {
  try {
    const { itemId } = req.params;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const item = user.wishDestinations.id(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.achieved = true; // Mark item as achieved
    await user.save();

    res.json({ message: "Item marked as achieved" });
  } catch (error) {
    console.error("Error marking item as achieved:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getWishlist(req, res) {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const formattedWishlist = await Promise.all(
      user.wishDestinations.map(async (destinationId) => {
        const destination = await Destination.findById(destinationId);
        if (!destination) {
          // Handle the case where the destination is not found
          return null;
        }
        return {
          _id: destination._id,
          country: destination.country,
          state: destination.state,
          achieved: destination.achieved,
          // Include other properties if necessary
        };
      })
    );

    const validFormattedWishlist = formattedWishlist.filter(
      (destination) => destination !== null
    );

    res.json({ wishlist: validFormattedWishlist });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function addToWishlist(req, res) {
  try {
    const { country, state, achieved } = req.body;

    // Find the user
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new Destination object
    const newDestination = new Destination({ country, state });

    // Add the new Destination to the user's wishlist
    user.wishDestinations.push(newDestination);
    await user.save();

    res.json({ message: "Destination added to wishlist" });
  } catch (error) {
    console.error("Error adding destination to wishlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/*-- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}
