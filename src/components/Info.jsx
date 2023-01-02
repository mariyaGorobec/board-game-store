import React from "react";
import AppContext from "../context";
import styles from "./Drawer/Drawer.module.scss";

const Info = ({ title, imgURL, description }) => {
  const { setCartOpened } = React.useContext(AppContext);
  return (
    <div className={styles.emptyCart}>
      <img width={130} height={150} src = {imgURL}></img>
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={()=>setCartOpened(false)} className={styles.orangeButton}>
        <img className={styles.arrow} src='/img/arrow.svg' alt="arrow"></img>Вернуться
        назад
      </button>
    </div>
  );
};

export default Info;
