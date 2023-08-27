import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import * as usersService from "../../utilities/users-service";
import { Link } from "react-router-dom";
import "./HomePage.css";
import Carousel from "react-bootstrap/Carousel";

const HomePage = ({ user }) => {
  const [achievedDestinations, setAchievedDestinations] = useState([]);
  const [diaryEntriesWithPhotos, setDiaryEntriesWithPhotos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await usersService.getAchievedWishes();
        console.log("Fetched achieved destinations response:", response);
        await setAchievedDestinations(response);
        await fetchDestinationDetailsAndPhotos(response);
      } catch (error) {
        console.error("Error fetching achieved destinations:", error);
      }
    };
    const fetchDestinationDetailsAndPhotos = async (destinations) => {
      try {
        const allPhotos = [];

        const promises = destinations.map(async (destination) => {
          const diaries = await usersService.fetchDiaryEntries(destination._id);
          const diariesWithPhotos = diaries.map((diary) => {
            allPhotos.push(...(diary.photos || []));

            return {
              ...diary,
              photos: diary.photos || [],
            };
          });
          return diariesWithPhotos;
        });

        const allDiariesWithPhotos = await Promise.all(promises);
        setDiaryEntriesWithPhotos(allDiariesWithPhotos.flat());
        console.log("All photos:", allPhotos);
      } catch (error) {
        console.error("Error fetching diary entries:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-page">
      <div className="welcome-banner">
        <h1>Welcome, {user.name}!</h1>
        <p>
          Explore your achieved wish destinations and relive the moments through
          photos.
        </p>
        <br />
        <Link to="/wishlist">
          <button>Add New Wish Destination</button>
        </Link>
      </div>
      {diaryEntriesWithPhotos.length > 0 && (
        <div className="carousel-container">
          <br /> <h2>Relive Your Journey</h2>
          <Carousel>
            {diaryEntriesWithPhotos.map((diary) => (
              <Carousel.Item key={diary._id}>
                <div className="image-container">
                  {diary.photos.map((photoUrl, index) => (
                    <img
                      key={index}
                      src={photoUrl}
                      alt={`Image from diary entry on ${diary.date}`}
                      className="diary-image"
                    />
                  ))}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default HomePage;
