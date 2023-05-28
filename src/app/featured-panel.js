import styles from "./page.module.css";
import { useState, useEffect } from "react";

const FeaturedPanel = ({ data }) => {
  
  //TO ADD LOGIC FOR THE INCREASE/DECREASE MONTH & YEAR

  // TO AMEND AND ADD MORE COMMENTS:
  // function getFirstThreeComments(data) {
  //   data[data.length - 1].issues.slice(0, 3);
  // }

  return (
    <div className="score-container__featured">
      {data.map((item, index) => {
        if (index === data.length - 1) {
          return (
            <div className="score-container__progress-container" key={index}>
              <h2>{item.monthYear}</h2>
              <p className="score-container__featured__score">
                {item.averageScore}
              </p>
              <p>^ last month: 0.3</p>
              <p>^ last year: 0.1</p>
              {item.items.map((item, index) => {
                if (index === 0) {
                  return <blockquote>{item.comment}</blockquote>;
                }
              })}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default FeaturedPanel;
