import styles from "./page.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Chart() {
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
    <main className={styles.main}>
      <select value={socialMediaSource} onChange={handleChange}>
        <option value="twitter,google,facebook">All</option>
        <option value="twitter">Twitter</option>
        <option value="facebook">Facebook</option>
        <option value="google">Google</option>
      </select>
      {monthsAndYears.map((item) => {
        return (
          <div key={item.monthYear}>
            <div>{item.monthYear}</div>
            <div>{item.averageScore}</div>
          </div>
        );
      })}
    </main>
  );
}
