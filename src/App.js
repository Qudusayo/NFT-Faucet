import Banner from "./assets/NFT_FAUCET.png";
import styles from "./App.module.scss";
import { useEffect, useState } from "react";
import console from "console-browserify";
import WAValidator from "multicoin-address-validator/dist/wallet-address-validator";
import Navbar from "./Components/Navbar/Navbar";
import contractABI from "./artifacts/contracts/NFTFaucet.sol/NFTFaucet.json";
import { useChain, useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import useMetamask from "./Hooks/useMetamask.js";
import ChainBanner from "./Components/ChainBanner/ChainBanner";
import Footer from "./Components/Footer/Footer";

function App() {
  const [unit, setUnit] = useState(1);
  const [recipient, setRecipient] = useState("");
  const [invalidAddress, setInvalidAddress] = useState(false);
  const { fetch } = useWeb3ExecuteFunction();
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  const { isAuthenticated, Moralis, isWeb3Enabled, enableWeb3 } = useMoralis();
  const { chainId } = useChain();
  const isMetaMaskInstalled = useMetamask();
  const supportedChain = process.env.REACT_APP_SUPPORTED_CHAIN_ID;

  useEffect(() => {
    if (!isWeb3Enabled && isAuthenticated) {
      if (isMetaMaskInstalled) {
        enableWeb3();
      } else {
        enableWeb3({ provider: "walletconnect" });
      }
    }
  }, [isWeb3Enabled, isAuthenticated]);

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
    let isValidAddress = WAValidator.validate(recipient, "eth");
    if (!isValidAddress) {
      return setInvalidAddress(!isValidAddress);
    }

    let params = {
      _amount: unit,
      _dest: recipient,
    };

    let options = {
      contractAddress,
      functionName: "mint",
      abi: contractABI.abi,
      params,
    };
    // console.log(options);

    fetch({
      params: options,
      onSuccess: (tx) => {
        console.log(tx);
        return tx.wait().then((newTx) => {
          console.log(newTx);
        });
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <>
      <ChainBanner chain={chainId} />
      <Navbar />
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
              autoCorrect="false"
              disabled={!isAuthenticated}
              placeholder={"0x00000000000000000000000000000000...."}
            />
            <div className={styles.controlBlock}>
              <button
                type="button"
                onClick={() => setUnittHandler("-")}
                disabled={!isAuthenticated}
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
                type="button"
                onClick={() => setUnittHandler("+")}
                disabled={!isAuthenticated}
              >
                +
              </button>
            </div>
            <input
              type={"submit"}
              disabled={!isAuthenticated || chainId !== supportedChain}
            />
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
