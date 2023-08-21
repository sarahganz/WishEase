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
  getAchievedWishes,
  getAchievedWishDetails,
};

function checkToken(req, res) {
  // req.user will always be there for you when a token is sent
  // console.log("req.user", req.user);
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

    // Check if the item exists in the wishDestinations array
    if (!user.wishDestinations.includes(itemId)) {
      return res.status(404).json({ message: "Item not found in wishlist" });
    }

    // Find the item in the wishDestinations array
    const itemIndex = user.wishDestinations.indexOf(itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in wishlist" });
    }

    // Create a reference to the item
    const item = user.wishDestinations[itemIndex];

    // Move the item to achievedDestinations and remove from wishDestinations
    user.achievedDestinations.push(item);
    user.wishDestinations.splice(itemIndex, 1);

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
    console.log("Creating new destination:", { country, state });
    const newDestination = new Destination({ country, state });

    // Save the new Destination to the database
    await newDestination.save();

    // Add the new Destination's ObjectId to the user's wishlist
    user.wishDestinations.push(newDestination._id);
    await user.save();
    console.log("User after saving:", user);

    res.json({ message: "Destination added to wishlist" });
  } catch (error) {
    console.error("Error adding destination to wishlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getAchievedWishes(req, res) {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const formattedAchievedWishes = await Promise.all(
      user.achievedDestinations.map(async (destinationId) => {
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

    const validFormattedAchievedWishes = formattedAchievedWishes.filter(
      (destination) => destination !== null
    );

    res.json({ achievedWishes: validFormattedAchievedWishes });
  } catch (error) {
    console.error("Error fetching achieved wishes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getAchievedWishDetails(req, res) {
  try {
    const { itemId } = req.params;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the item exists in the achievedDestinations array
    const item = user.achievedDestinations.find(
      (destination) => destination.toString() === itemId
    );
    if (!item) {
      return res
        .status(404)
        .json({ message: "Item not found in achieved wishes" });
    }

    // You can return additional details as needed
    res.json({
      _id: item._id,
      country: item.country,
      state: item.state,
      // Include other details if necessary
    });
  } catch (error) {
    console.error("Error fetching achieved wish details:", error);
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
