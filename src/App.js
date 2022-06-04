import Banner from "./assets/NFT_FAUCET.png";
import styles from "./App.module.scss";
import { useState } from "react";
import console from "console-browserify";

function App() {
  const [unit, setUnit] = useState(1);

  const setAmountHandler = (direction) => {
    if (direction === "+" && unit < 10) {
      setUnit(unit + 1);
    }
    else if (direction === "-" && unit > 1) {
      setUnit(unit - 1);
    }
  };


  const nftClaimHandler = (e) => {
    e.preventDefault();
    console.log(unit);
  };

  return (
    <div className={styles.App}>
      <div>
        <img src={Banner} className={styles.AppDisplay} alt="logo" />
      </div>
      <div>
        <form className={styles.AppForm} onSubmit={nftClaimHandler}>
          <h2>Get Some Test NFT</h2>
          <input type={"text"} />
          <div className={styles.controlBlock}>
            <button type="button" onClick={() => setAmountHandler("-")}>-</button>
            <input type={"number"} value={unit} disabled />
            <button type="button" onClick={() => setAmountHandler("+")}>+</button>
          </div>
          <input type={"submit"} />
        </form>
      </div>
    </div>
  );
}

export default App;
