import styles from "./Card.module.scss";

import React from "react";
import AppContext from "../../context";
import DivideNumberIntoСategory from "../DivideNumberIntoСategory";

function Card({
  hash,
  onFavorite,
  imgURL,
  title,
  price,
  description,
  onPlus,
  favorited = false,
  
}) {
  
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const {isItemAdded} = React.useContext(AppContext);
  return (
    <div className={styles.card}>
     
          <div className={styles.cardTop}>
            <div
              className={styles.favorite}
              onClick={() => {
                setIsFavorite(!isFavorite);
                onFavorite({ title, imgURL, price, hash });
              }}
            >
              {isFavorite ? (
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="32" height="32" rx="7" fill="#FFC0C0" />
                  <path
                    d="M23.6129 11.869C23.3646 11.3076 23.0067 10.7988 22.5591 10.3712C22.1111 9.94231 21.583 9.60147 21.0033 9.36723C20.4023 9.12337 19.7577 8.99855 19.1068 9.00001C18.1938 9.00001 17.3029 9.24422 16.5288 9.70551C16.3435 9.81585 16.1676 9.93705 16.0009 10.0691C15.8342 9.93705 15.6583 9.81585 15.4731 9.70551C14.6989 9.24422 13.8081 9.00001 12.895 9.00001C12.2375 9.00001 11.6004 9.12302 10.9985 9.36723C10.4169 9.6024 9.89281 9.94067 9.44276 10.3712C8.99455 10.7983 8.63651 11.3072 8.38893 11.869C8.1315 12.4533 8 13.0738 8 13.7124C8 14.3147 8.12594 14.9424 8.37597 15.581C8.58525 16.1146 8.88529 16.6682 9.26866 17.2272C9.87614 18.1117 10.7114 19.0343 11.7486 19.9695C13.4673 21.5198 15.1693 22.5907 15.2416 22.6341L15.6805 22.9091C15.875 23.0303 16.125 23.0303 16.3195 22.9091L16.7584 22.6341C16.8306 22.5889 18.5308 21.5198 20.2514 19.9695C21.2886 19.0343 22.1238 18.1117 22.7313 17.2272C23.1147 16.6682 23.4166 16.1146 23.624 15.581C23.874 14.9424 24 14.3147 24 13.7124C24.0018 13.0738 23.8703 12.4533 23.6129 11.869V11.869Z"
                    fill="url(#paint0_linear)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear"
                      x1="16"
                      y1="9"
                      x2="16"
                      y2="23"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FFB0B0" />
                      <stop offset="1" stopColor="#FF4343" />
                    </linearGradient>
                  </defs>
                </svg>
              ) : (
                <img
                  width={28}
                  height={28}
                  alt="unliked"
                  src="/img/unliked.svg"
                ></img>
              )}
            </div>
            <img
              width={133}
              height={112}
              src={imgURL}
              alt={"Изображение игры " + title}
            ></img>
            <h5>{title}</h5>
            <span>{description}</span>
          </div>
          <div className={styles.cardBottom}>
            <div className={styles.price}>
              <span> Цена:</span>
              <b>{<DivideNumberIntoСategory num = {price}></DivideNumberIntoСategory>} руб.</b>
            </div>
            <img
              alt="Кнопка добавить или кнопка добавленно"
              className={styles.plus}
              onClick={() => {
               
                onPlus({ hash, title, imgURL, price});
              }}
              width="15"
              height="15"
              src={isItemAdded(hash) ? "/img/btn-checked.svg" : "/img/plus.svg"}
            ></img>
          </div>
      
    </div>
  );
}
export default Card;
