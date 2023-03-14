import styles from "./Card.module.scss";
import throttle from 'lodash.throttle';
import React from "react";
import AppContext from "../../context";
import DivideNumberIntoСategory from "../DivideNumberIntoСategory";
import EditingGame from "../../pages/EditingGame";
import { useNavigate } from 'react-router-dom';


function Card({
  onRemoveProduct,
 
  onFavorite,
  imgURL,
  title,
  _id,
  price,
  description,
  onPlus,
  favorited = false,
  added = false
}) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const {isItemAdded,isAuth,addToCart, isAdmin,setIdProduct} = React.useContext(AppContext);
  const onClick = throttle(addToCart, 10000);
  const [isCart, setIsCart] = React.useState(added);

  return (
    <div className={styles.card}>
     
          <div className={styles.cardTop}>
            {onFavorite && <div
              className={styles.favorite}
              onClick={() => {
                
                onFavorite(_id);
                setIsFavorite(!isFavorite);
              }}>
              {isAuth&&!isAdmin?(isFavorite ? (
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
              )):(isAdmin?(<svg className={styles.pencil}
                onClick={()=>{
                  setIdProduct(_id)
                  navigate("/gameEdit");
                }}
                width="25"
                height="25" viewBox="0 0 1276.000000 1280.000000"
               preserveAspectRatio="xMidYMid meet">
              <metadata>
              Created by potrace 1.15, written by Peter Selinger 2001-2017
              </metadata>
              <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
              fill="#f47c77" stroke="none">
              <path d="M11145 12790 c-302 -78 -364 -99 -510 -172 -120 -60 -213 -119 -320
              -203 -44 -35 -2232 -2216 -4861 -4847 l-4782 -4783 -107 -405 c-60 -223 -116
              -434 -126 -470 -26 -100 -219 -818 -236 -880 -32 -123 -44 -167 -122 -457
              l-81 -302 0 -135 0 -136 136 0 135 0 302 81 c166 45 325 87 352 94 28 8 86 23
              130 35 44 12 231 62 415 111 184 50 358 96 385 104 28 7 221 59 430 115 l380
              101 4871 4872 c4810 4811 4872 4873 4947 4987 75 114 170 299 202 395 163 480
              55 946 -313 1360 -200 225 -440 389 -687 468 -107 34 -157 44 -307 62 -136 16
              -186 17 -233 5z m-230 -667 c69 -198 215 -426 398 -621 37 -40 67 -77 65 -82
              -2 -4 -363 -362 -803 -795 -440 -433 -939 -926 -1110 -1094 -170 -169 -614
              -606 -985 -971 -371 -365 -821 -809 -1000 -985 -179 -177 -806 -796 -1395
              -1375 -1928 -1899 -2435 -2399 -2825 -2785 -1279 -1266 -1278 -1265 -1327
              -1286 -71 -31 -189 -59 -247 -59 -75 0 -113 24 -170 105 -130 187 -151 289
              -97 465 18 55 37 138 43 183 l11 82 4546 4548 c2500 2502 4572 4569 4604 4594
              64 50 234 153 253 153 6 0 24 -35 39 -77z m774 -942 c156 -100 296 -155 438
              -175 l83 -11 -30 -64 c-17 -35 -55 -102 -86 -150 -50 -77 -563 -593 -4719
              -4750 l-4663 -4664 -83 -18 c-104 -23 -238 -24 -308 -3 -103 30 -168 124 -198
              287 -13 76 -12 281 2 295 2 3 10 0 17 -6 10 -8 176 151 698 666 377 371 984
              970 1350 1331 366 360 832 820 1035 1021 204 201 681 671 1060 1045 672 662
              965 950 1695 1671 195 192 796 784 1335 1315 539 530 1274 1255 1635 1611 360
              356 657 647 659 648 2 0 38 -22 80 -49z m-10547 -8670 c-10 -151 61 -332 210
              -528 43 -56 123 -117 178 -134 84 -26 260 -28 323 -4 15 7 17 -2 17 -98 0
              -300 120 -528 325 -617 28 -12 91 -29 142 -39 l91 -16 -666 -178 c-367 -98
              -671 -177 -677 -177 -5 1 -62 62 -125 137 -63 74 -141 166 -174 204 l-58 69
              187 702 c135 505 193 709 208 726 11 12 21 22 22 22 1 0 0 -31 -3 -69z"/>
              </g>
              </svg>):'')}
            </div>}
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
              <b><DivideNumberIntoСategory num={price}></DivideNumberIntoСategory> руб.</b>
            </div>
            {isAuth&&!isAdmin?(onPlus && <img
              alt="Кнопка добавить или кнопка добавленно"
              className={styles.plus}
              onClick={()=>{
                onClick(_id);
              
              }}
              width="15"
              height="15"
              src={isItemAdded(_id) ? "/img/btn-checked.svg" : "/img/plus.svg"}
            ></img>):(isAdmin?(<svg className={styles.onRemove}
              onClick={()=>{
                onRemoveProduct(_id);
              }}
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="31"
                height="31"
                rx="7.5"
                fill="white"
                stroke="#f47c77"
              />
              <path
                d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z"
                fill="#f47c77"
              />
            </svg>):'')}
          </div>
      
    </div>
  );
}
export default Card;