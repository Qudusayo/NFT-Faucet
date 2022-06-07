import Banner from "./assets/NFT_FAUCET.png";
import styles from "./App.module.scss";
import { useState } from "react";
// import console from "console-browserify";
import WAValidator from "multicoin-address-validator/dist/wallet-address-validator";
import { useMoralis, useMoralisCloudFunction } from "react-moralis";
import ChainBanner from "./Components/ChainBanner/ChainBanner";
import Footer from "./Components/Footer/Footer";
import { useNotification } from "web3uikit";
import Loader from "./Components/Loader/Loader";

function App() {
  const [unit, setUnit] = useState(1);
  const [recipient, setRecipient] = useState("");
  const [invalidAddress, setInvalidAddress] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const { fetch } = useMoralisCloudFunction(
    "mint_nft",
    {
      recipient,
      amount: unit,
    },
    { autoFetch: false }
  );
  const { isInitialized } = useMoralis();
  const dispatch = useNotification();

  const handleNewNotification = (type, message, title) => {
    dispatch({
      type,
      message,
      title,
      position: "topR",
    });
  };

  const setRecipientHandler = (e) => {
    let address = e.target.value;
    let isValidAddress = WAValidator.validate(address, "eth");

    setRecipient(address);
    setInvalidAddress(!isValidAddress);
  };

  const setUnitHandler = (direction) => {
    if (direction === "+" && unit < 10) {
      setUnit(unit + 1);
    } else if (direction === "-" && unit > 1) {
      setUnit(unit - 1);
    }
  };

  const nftClaimHandler = (e) => {
    e.preventDefault();
    let isValidAddress = WAValidator.validate(recipient, "eth");
    if (!isValidAddress) {
      return setInvalidAddress(!isValidAddress);
    }

    setIsMinting(true);

    fetch({
      onSuccess: (res) => {
        // console.log(res);

        if (res) {
          handleNewNotification(
            "success",
            `${unit} NFTs has been successfully sent to ${recipient}`,
            "NFT mint successful"
          );
          setUnit(1);
          setRecipient("");
        } else {
          handleNewNotification(
            "error",
            `Seems Limit reached, you could try with a lower amount or try in 1 hour time`,
            "Error sending NFT"
          );
        }
        return setIsMinting(false);
      },
      onError: (err) => {
        // console.log(err);

        handleNewNotification(
          "error",
          `Seems Limit reached, you could try with a lower amount or try in 1 hour time`,
          "Error sending NFT"
        );
        return setIsMinting(false);
      },
    });
  };

  return (
    <>
      <ChainBanner />
      <div className={styles.App}>
        <div className={styles.AppDiv}>
          <img src={Banner} className={styles.AppDisplay} alt="logo" />
        </div>
        <div className={styles.AppDiv}>
          <form className={styles.AppForm} onSubmit={nftClaimHandler}>
            <h2>Get Some Test NFT</h2>
            <input
              type={"text"}
              onChange={setRecipientHandler}
              value={recipient}
              className={invalidAddress ? styles.dangerous : null}
              autoCorrect="false"
              disabled={!isInitialized || isMinting}
              placeholder={"0x00000000000000000000000000000000...."}
            />
            <div className={styles.controlBlock}>
              <button
                className={styles.controlBtn}
                type="button"
                onClick={() => setUnitHandler("-")}
                disabled={!isInitialized || isMinting}
              >
                -
              </button>
              <input
                type={"number"}
                value={unit}
                onChange={() => {}}
                disabled
              />
              <button
                className={styles.controlBtn}
                type="button"
                onClick={() => setUnitHandler("+")}
                disabled={!isInitialized || isMinting}
              >
                +
              </button>
            </div>
            <button
              type={"submit"}
              id={styles.submit}
              disabled={!isInitialized || isMinting}
            >
              {isMinting ? <Loader /> : "Submit"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
