import styles from "./page.module.css";
import { useEffect } from "react";

export default function Chart() {
  useEffect(() => {
    fetch(
      `https://77ke2s5tn7gprqjtu2kcldaaru0uarhb.lambda-url.eu-west-2.on.aws/`
    )
      .then((response) => response.json())
      .then((actualData) => console.log(actualData));
  }, []);

  return (
    <main className={styles.main}>
      <div>Hello</div>
    </main>
  );
}
