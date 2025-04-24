import { useState } from "react";
const Moralis = require('moralis').default;
const { EvmChain } = require('@moralisweb3/common-evm-utils');
import Select from "react-select";
import styles from "../styles/landing.module.css";

import Image from "next/image";
import btcImg from "../public/assets/BTC_img.png";
import btcEllipse from "../public/assets/Ellipse 8.png";

export default function Header() {
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
    <main className={styles.wrapper}>

      {/* Hero section */}
      <section className={styles.hero}>
        <h1>Check the price for any Contract Address in any of these chains: <br />Ethereum, Bsc, Polygon, Avalanche, Arbitrum, Base, Optimism, Linea, Solana.</h1>

      </section>


      {/* Token price checker */}
      <section className={styles.tokenPriceSection}>

        <h2>Enter Token Contract Address to get the price:</h2>
        <input
          id="contractAddress"
          className={styles.tokenInput}
          type="text"
          placeholder="e.g. 0x6982508145454ce325ddbe47a25d4ec3d2311933"
        />
        <h2>Or Token Symbol to get the price:</h2>
        <input
          id="contractSymbol"
          className={styles.tokenInput}
          type="text"
          placeholder="e.g. btc"
        />
        <button onClick={handleSubmit} className={styles.primaryBtn}>
          Get Price
        </button>

        {showResult && (
          <div className={styles.tokenPriceBox}>
            <span>{result}</span>
          </div>
        )}
      </section>
      <div className={styles.imageWrapper}>
        <Image
          src={btcEllipse}
          alt="ellipse"
          className={styles.baseImage}
        />
        <Image
          src={btcImg}
          alt="BTC img"
          className={styles.overlayImage}
        />
      </div>
    </main>
  );
}
