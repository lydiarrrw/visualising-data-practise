import styles from "./page.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import FeaturedPanel from "./featured-panel.js";

const Dashboard = ({ props }) => {
  const [fetchData, setFetchData] = useState([]);
  const monthsAndYears = [];
  const [socialMediaSource, setSocialMediaSource] = useState(
    "google,facebook,twitter"
  );

  useEffect(() => {
    axios
      .get(
        `https://77ke2s5tn7gprqjtu2kcldaaru0uarhb.lambda-url.eu-west-2.on.aws/?sources=${socialMediaSource}`
      )
      .then((data) => {
        setFetchData(data.data);
      });
  }, [socialMediaSource]);

  function orderReviewsByDate() {
    fetchData.forEach((item) => {
      const date = new Date(item.postedDate);
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      const key = `${month} ${year}`;

      let found = false;
      monthsAndYears.forEach((obj) => {
        if (obj.monthYear === key) {
          obj.items.push(item);
          found = true;
        }
      });

      if (!found) {
        monthsAndYears.push({ monthYear: key, items: [item] });
      }
    });

    return monthsAndYears;
  }

  orderReviewsByDate();

  function calculateAverage(array) {
    const sum = array.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    const average = sum / array.length;
    return average;
  }

  function calculateOverallScore() {
    monthsAndYears.forEach((item) => {
      const reviewObjects = item.items;
      const totalScore = [];

      reviewObjects.forEach((score) => {
        const overallScore = score.overallRecommendScore;
        totalScore.push(overallScore);
        return overallScore;
      });
      const averageScore = calculateAverage(totalScore);
      item["averageScore"] = averageScore.toFixed(1);
    });
    return;
  }

  calculateOverallScore();

  const handleChange = (event) => {
    setSocialMediaSource(event.target.value);
  };

  return (
    <main>
      <h1>Overall Recommended Scores</h1>
      <div className="score-section">
        <FeaturedPanel data={monthsAndYears} />
        <section>
          <div className="filter-container">
            <select
              className="social-media-selector"
              value={socialMediaSource}
              onChange={handleChange}
            >
              <option value="" disabled defaultValue hidden>
                Filter by social media source:
              </option>
              <option value="twitter,google,facebook">All</option>
              <option value="twitter">Twitter</option>
              <option value="facebook">Facebook</option>
              <option value="google">Google</option>
            </select>
          </div>

          <div className="score-container">
            {monthsAndYears.map((item, index) => {
              if (index !== monthsAndYears.length - 1) {
                return (
                  <div
                    className="score-container__progress-container"
                    key={index}
                  >
                    <CircularProgressbar
                      value={item.averageScore}
                      maxValue={5}
                      text={`${item.averageScore}`}
                      styles={{ path: { stroke: "#004B54" } }}
                    />
                    <p>{item.monthYear}</p>
                  </div>
                );
              }
            })}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
