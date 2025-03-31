import { useState } from "react";
const Moralis = require('moralis').default;
const { EvmChain } = require('@moralisweb3/common-evm-utils');
import Select from "react-select";
import styles from "../styles/Home.module.css";

export default function Header() {
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");
  const [chainValue, setChainValue] = useState("");

  const customStyles = {
    option: (provided) => ({
      ...provided,
      color: "#000000",
      backgroundColor: "#ffffff",
    }),
  };

  const changeHandler = (chainValue) => {
    setChainValue(chainValue);
  };

  const handleSubmit = async () => {
    const token_address = document.querySelector("#contractAddress").value;
    if (!token_address) {
      setResult("Please enter a token address.");
      return;
    }

    try {
      const response = await fetch("/api/getprice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: token_address }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Fetch Post Error");
      }
      const json = await response.json();
      console.log(json);
      setResult(`$ ${json.price}`);
      setShowResult(true);
      setChainValue("");
      document.querySelector("#contractAddress").value = "";
    } catch (error) {
      console.error("Error fetching token price:", error);
    }

  };

  return (
    <section className={styles.main}>
      <form
        className={styles.getTokenForm}
        name="create-profile-form"
        method="POST"
        action="#"
      >
        <label className={styles.label} htmlFor="contractAddress">
          Add Any Contract Address in any of these chains: Ethereum, Bsc, Polygon, Avalanche, Arbitrum, Base, Optimism, Linea, Solana
        </label>
        <input
          className={styles.contractAddress}
          type="text"
          id="contractAddress"
          name="contractAddress"
          placeholder="e.g. 0x6982508145454ce325ddbe47a25d4ec3d2311933"
          maxLength="120"
          required
        />
          <div className={styles.label}>
          Hint: You can get a token address on CoinMarketCap.com or similar website.</div>
      </form>
      <button className={styles.form_btn} onClick={handleSubmit}>
        Submit
      </button>
      <section className={styles.result}>
        {showResult && <p>{result}</p>}
      </section>
    </section>
  );
}
