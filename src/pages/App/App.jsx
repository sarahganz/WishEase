import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import "./App.css";
import WishListPage from "../WishListPage/WishListPage";
import AchievedWishesPage from "../AchievedWishesPage/AchievedWishesPage";
import AchievedWishDetailsPage from "../AchievedWishDetailsPage/AchievedWishDetailsPage";
import HomePage from "../HomePage/HomePage";
import AboutPage from "../AboutPage/AboutPage";
import WelcomePage from "../WelcomePage/WelcomePage";
import NavBar from "../../components/NavBar/NavBar";
import NavBarWelcome from "../../components/NavBar/NavBarWelcome";
import Footer from "../../components/Footer/Footer";
import AWS from "aws-sdk";
import { set } from "mongoose";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-2",
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
          <Footer />
        </>
      ) : (
        <>
          <NavBarWelcome user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<WelcomePage setUser={setUser} />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
          <Footer />
        </>
      )}
    </main>
  );
}
