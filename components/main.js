import { useState, useEffect } from "react";
const Moralis = require('moralis').default;
import styles from "../styles/Home.module.css";

export default function Main() {
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const token_address = document.querySelector("#contractAddress").value.trim();
    const symbol = document.querySelector("#contractSymbol").value.trim().toUpperCase();
    try {
      if (symbol && symbol.length <= 10) {
        const resp = await fetch(`https://cryptoprices.cc/${symbol}`);
        const data = await resp.json();
        if (data) {
          setResult(`$ ${data}`);
          setShowResult(true);
          setLoading(false);
          document.querySelector("#contractAddress").value = "";
          document.querySelector("#contractSymbol").value = "";
          return;
        }
      }

      const response = await fetch("/api/getprice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: token_address }),
      });

      if (!response.ok) throw new Error("Fetch Post Error");

      const json = await response.json();
      setResult(`$ ${json.price}`);
      setShowResult(true);
      document.querySelector("#contractAddress").value = "";
    } catch (error) {
      console.error("Error fetching token price:", error);
      setResult("Failed to fetch token price.");
      setShowResult(true);
    }

    setLoading(false);
  };

  return (
    <section className={styles.main}>
      <form className={styles.getTokenForm}>
        <label className={styles.label} htmlFor="contractAddress">
          Add Any Contract Address in any of these chains: Ethereum, Bsc, Polygon, Avalanche, Arbitrum, Base, Optimism, Linea, Solana
        </label>
        <input
          className={styles.contractAddress}
          type="text"
          id="contractAddress"
          placeholder="e.g. 0x2260fac5e5542a773aa44fbcfedf7c193bc2c599"
        />

        <label className={styles.label} htmlFor="contractSymbol">
          Or Token Symbol (e.g., BTC, ETH, PEPE)
        </label>
        <input
          className={styles.contractAddress}
          type="text"
          id="contractSymbol"
          placeholder="e.g. btc"
        />
        <div className={styles.label}>
          Hint: You can get a token address on <a href="https://www.CoinMarketCap.com">CoinMarketCap.com</a> or similar website.</div>
      </form>

      <button className={styles.form_btn} onClick={handleSubmit}>
        {loading ? "Loading..." : "Get Price"}
      </button>

      <section className={styles.result}>
        {showResult && <p>{result}</p>}
      </section>
    </section>
  );
}