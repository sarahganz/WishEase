import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import "./App.css";
import AuthPage from "../AuthPage/AuthPage";
import WishListPage from "../WishListPage/WishListPage";
import AchievedWishesPage from "../AchievedWishesPage/AchievedWishesPage";
import AchievedWishDetailsPage from "../AchievedWishDetailsPage/AchievedWishDetailsPage";
import NavBar from "../../components/NavBar/NavBar";

export default function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
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
