/*
import styles from "../styles/Home.module.css";

export default function Header() {
  return (
    <section>
      <h1 className={styles.title}>What is the token price?</h1>
    </section>
  );
}
*/

import styles from "../styles/landing.module.css";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className={styles.navbar}>
      <button className={styles.menuToggle} onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>
      <nav className={`${styles.navLinks} ${isOpen ? styles.show : ""}`}>
        <a href="#" className={styles.navLink}>Home</a>
        <a
          href="https://coinmarketcap.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.navLink}
        >
          CoinMarketCap
        </a>
        <a
          href="https://www.coingecko.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.navLink}
        >
          CoinGecko
        </a>
        <a
          href="https://cryptorank.io//"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.navLink}
        >
          Cryptorank
        </a>
      </nav>
    </header >
  );
}
