import { useState } from "react";
const Moralis = require('moralis').default;
const { EvmChain } = require('@moralisweb3/common-evm-utils');
import Select from "react-select";
import styles from "../styles/Home.module.css";

export default function Header() {
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");
  const [chainValue, setChainValue] = useState("");
  let address;

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
    address = document.querySelector("#contractAddress").value;
    const chains = [
      "0x1",        // Ethereum
      "0x38",       // Binance Smart Chain (BSC)
      "0x89",       // Polygon
      "0xa86a",     // Avalanche
      "0xa4b1",     // Arbitrum
      "0x2105",     // Base
      "0xa",        // Optimism
      "0xe708",     // Linea
    ];
    if (!Moralis.Core.isStarted) {
      await Moralis.start({
        apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
      });
    }

    if (address.startsWith("0x")) {
      for (let chain of chains) {
        const response = await Moralis.EvmApi.token.getTokenPrice({
          address,
          chain,
        });
        if (response.toJSON().usdPrice) {
          setResult(`$ ${response.toJSON().usdPrice}`);
          setShowResult(true);
          setChainValue("");
          document.querySelector("#contractAddress").value = "";
          break;
        }
      }
    } else {
      const response2 = await Moralis.SolApi.token.getTokenPrice({
        "network": "mainnet",
        address,
      });
      if (response2.toJSON().usdPrice) {
        setResult(`$ ${response2.toJSON().usdPrice}`);
        setShowResult(true);
        setChainValue("");
        document.querySelector("#contractAddress").value = "";
      }
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
          Add ERC20 Contract Address
        </label>
        <input
          className={styles.contractAddress}
          type="text"
          id="contractAddress"
          name="contractAddress"
          maxLength="120"
          required
        />
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
