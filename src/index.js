import console from "console-browserify";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <MoralisProvider
      serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL}
      appId={process.env.REACT_APP_MORALIS_APP_ID}
    >
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </MoralisProvider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
