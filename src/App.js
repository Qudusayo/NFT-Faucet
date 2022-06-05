import Banner from "./assets/NFT_FAUCET.png";
import styles from "./App.module.scss";
import { useState } from "react";
import console from "console-browserify";
import WAValidator from "multicoin-address-validator/dist/wallet-address-validator";

function App() {
  const [unit, setUnit] = useState(1);
  const [recipient, setRecipient] = useState("");
  const [invalidAddress, setInvalidAddress] = useState(false);

  const setRecipientHandler = (e) => {
    let address = e.target.value;
    let isValidAddress = WAValidator.validate(address, "eth");

    setRecipient(address);
    setInvalidAddress(!isValidAddress);
  };

  const setUnittHandler = (direction) => {
    if (direction === "+" && unit < 10) {
      setUnit(unit + 1);
    } else if (direction === "-" && unit > 1) {
      setUnit(unit - 1);
    }
  };

  const nftClaimHandler = (e) => {
    e.preventDefault();
    console.log(unit);
    console.log(recipient);
  };

  return (
    <div className={styles.App}>
      <div>
        <img src={Banner} className={styles.AppDisplay} alt="logo" />
      </div>
      <div>
        <form className={styles.AppForm} onSubmit={nftClaimHandler}>
          <h2>Get Some Test NFT</h2>
          <input
            type={"text"}
            onChange={setRecipientHandler}
            value={recipient}
            className={invalidAddress ? styles.dangerous : null}
          />
          <div className={styles.controlBlock}>
            <button type="button" onClick={() => setUnittHandler("-")}>
              -
            </button>
            <input type={"number"} value={unit} onChange={() => {}} disabled />
            <button type="button" onClick={() => setUnittHandler("+")}>
              +
            </button>
          </div>
          <input type={"submit"} />
        </form>
      </div>
    </div>
  );
}

export default App;
