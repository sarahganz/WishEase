import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import "./App.css";
import AuthPage from "../AuthPage/AuthPage";
import WishListPage from "../WishListPage/WishListPage";
import AchievedWishesPage from "../AchievedWishesPage/AchievedWishesPage";
import AchievedWishDetailsPage from "../AchievedWishDetailsPage/AchievedWishDetailsPage";
import HomePage from "../HomePage/HomePage";
import NavBar from "../../components/NavBar/NavBar";
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-2", // Replace with your AWS region
});

export default function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            <Route path="/wishlist" element={<WishListPage user={user} />} />
            <Route path="/achieved-wishes" element={<AchievedWishesPage />} />
            <Route
              path="/achieved-wishes/:id"
              element={<AchievedWishDetailsPage user={user} />}
            />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
