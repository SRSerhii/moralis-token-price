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

export default function Header() {
  return (
    <header className={styles.navbar}>
      <nav className={styles.nav}>
        <div className={styles.navbar}>
        <a href="#" className={styles.navLink}>Home</a>
          <a
            href="https://coinmarketcap.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            CoinMarketCap
          </a>
          <a href="#" className={styles.navLink}>Features</a>
          <a href="#" className={styles.navLink}>Contact</a>
        </div>
      </nav>
    </header>
  );
}
