import Badge from "./../../assets/badge.svg";
import styles from "./Footer.module.scss";

function Footer() {
  return (
    <div className={styles.Footer}>
      <div className={styles.FooterReg}>
        Built with 💖 by{" "}
        <a
          href="https://twitter.com/praiseprof"
          target="_blank"
          rel="noreferrer"
        >
          0xProf
        </a>{" "}
        and{" "}
        <a
          href="https://twitter.com/qudusayo"
          target="_blank"
          rel="noreferrer"
        >
          Qudusayo
        </a>
      </div>
      <img src={Badge} alt="badge" />
    </div>
  );
}

export default Footer;
