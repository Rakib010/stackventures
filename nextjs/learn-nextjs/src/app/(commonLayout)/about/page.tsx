import styles from "./About.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About us",
};

export default function AboutPage() {
  return (
    <div>
      <h1 className={styles.text_style}>About page</h1>
    </div>
  );
}
