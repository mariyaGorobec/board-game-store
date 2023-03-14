import styles from "./Header.module.scss";
import {Link} from 'react-router-dom';
import React from "react";

import DivideNumberIntoСategory from "../DivideNumberIntoСategory";
import { useCart } from "../hooks/useCart";
import AppContext from "../../context";


function Header(props) {
  const {totalPrice} = useCart();

  const {isAuth,isAdmin} = React.useContext(AppContext);
  return (
    <header>
      <Link to = "/">
      <div className={styles.headerLeft}>
        <img width={60} height={60} src="/img/icLog.png" alt="logo"></img>
        <div className={styles.headerInfo}>
          <h3>Поиграй-ка</h3>
          <p>Развлеки себя и своих друзей</p>
        </div>
      </div>
      </Link>
      <div className={styles.headerRight}>
        <ul>
         {isAuth&&!isAdmin?(<><li>
            <svg
              onClick={props.onClickCart}
              width="25"
              height="25"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.54548 18.1818C7.99735 18.1818 8.36366 17.8155 8.36366 17.3636C8.36366 16.9117 7.99735 16.5454 7.54548 16.5454C7.09361 16.5454 6.72729 16.9117 6.72729 17.3636C6.72729 17.8155 7.09361 18.1818 7.54548 18.1818Z"
                stroke="#f47c77"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.5455 18.1818C16.9973 18.1818 17.3637 17.8155 17.3637 17.3636C17.3637 16.9117 16.9973 16.5454 16.5455 16.5454C16.0936 16.5454 15.7273 16.9117 15.7273 17.3636C15.7273 17.8155 16.0936 18.1818 16.5455 18.1818Z"
                stroke="#f47c77"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 1H4.27273L6.46545 11.9555C6.54027 12.3321 6.7452 12.6705 7.04436 12.9113C7.34351 13.1522 7.71784 13.2801 8.10182 13.2727H16.0545C16.4385 13.2801 16.8129 13.1522 17.112 12.9113C17.4112 12.6705 17.6161 12.3321 17.6909 11.9555L19 5.09091H5.09091"
                stroke="#f47c77"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span><DivideNumberIntoСategory num ={totalPrice}></DivideNumberIntoСategory> руб.</span>
          </li>
          <li>
            <Link to="/favorites">
              <svg
                width="25"
                height="25"
                viewBox="0 0 22 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.1003 0C16.7293 0 18.0976 0.54932 19.2052 1.64796C20.3129 2.7466 20.8668 4.08759 20.8668 5.67092C20.8668 6.44643 20.7039 7.23002 20.3781 8.02169C20.0523 8.81335 19.6939 9.51616 19.303 10.1301C18.912 10.7441 18.2523 11.5357 17.3238 12.5051C16.3953 13.4745 15.6134 14.2581 14.9781 14.8559C14.3428 15.4537 13.3248 16.3665 11.9239 17.5944L10.4089 18.9515L8.89403 17.6429C7.52572 16.3827 6.51577 15.4537 5.8642 14.8559C5.21262 14.2581 4.42258 13.4745 3.49408 12.5051C2.56559 11.5357 1.90586 10.7441 1.51492 10.1301C1.12397 9.51616 0.773748 8.81335 0.464249 8.02169C0.15475 7.23002 0 6.44643 0 5.67092C0 4.08759 0.553841 2.7466 1.66152 1.64796C2.7692 0.54932 4.12123 0 5.71759 0C7.60717 0 9.17095 0.727041 10.4089 2.18112C11.6469 0.727041 13.2107 0 15.1003 0ZM10.5067 16.0918C12.1031 14.6701 13.2677 13.6118 14.0008 12.9171C14.7338 12.2224 15.5401 11.3903 16.4198 10.4209C17.2994 9.45153 17.9102 8.60332 18.2523 7.87628C18.5944 7.14924 18.7654 6.41412 18.7654 5.67092C18.7654 4.63691 18.4152 3.78061 17.7148 3.10204C17.0143 2.42347 16.1428 2.08418 15.1003 2.08418C14.3184 2.08418 13.5772 2.31037 12.8768 2.76276C12.1764 3.21514 11.6795 3.79677 11.3863 4.50765H9.43158C9.17095 3.79677 8.69041 3.21514 7.98997 2.76276C7.28952 2.31037 6.53206 2.08418 5.71759 2.08418C4.67507 2.08418 3.81173 2.42347 3.12757 3.10204C2.44342 3.78061 2.10134 4.63691 2.10134 5.67092C2.10134 6.41412 2.26423 7.14924 2.59002 7.87628C2.91581 8.60332 3.52666 9.45153 4.42258 10.4209C5.3185 11.3903 6.13297 12.2224 6.866 12.9171C7.59902 13.6118 8.74743 14.6701 10.3112 16.0918L10.4089 16.1888L10.5067 16.0918Z"
                  fill="#f47c77"
                />
              </svg>
            </Link>
          </li></>): ''}
          {isAdmin?
          (<Link to="/newGame">
          <svg className={styles.pencil}
            width="40"
            height="40" viewBox="0 0 1276.000000 1280.000000"
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
          </svg>
          </Link>)
:''
}
         {isAdmin?'': <li>
            <Link to={isAuth?"/orders":"/login"}>
            <svg
              width="25"
              height="25"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 10C0 4.579 4.579 0 10 0C15.421 0 20 4.579 20 10C20 13.19 18.408 16.078 16 17.924V18H15.898C14.23 19.245 12.187 20 10 20C7.813 20 5.77 19.245 4.102 18H4V17.924C1.592 16.078 0 13.189 0 10ZM7.12347 15.236C6.59154 15.6639 6.22136 16.2604 6.074 16.927C7.242 17.604 8.584 18 10 18C11.416 18 12.758 17.604 13.926 16.927C13.7785 16.2605 13.4082 15.6641 12.8764 15.2362C12.3445 14.8083 11.6827 14.5744 11 14.573H9C8.3173 14.5742 7.6554 14.808 7.12347 15.236ZM13.7677 13.4117C14.5877 13.9574 15.2286 14.7329 15.61 15.641C17.077 14.182 18 12.176 18 10C18 5.663 14.337 2 10 2C5.663 2 2 5.663 2 10C2 12.176 2.923 14.182 4.39 15.641C4.77144 14.7329 5.41227 13.9574 6.23227 13.4117C7.05227 12.866 8.01501 12.5742 9 12.573H11C11.985 12.5742 12.9477 12.866 13.7677 13.4117ZM6 8C6 5.72 7.72 4 10 4C12.28 4 14 5.72 14 8C14 10.28 12.28 12 10 12C7.72 12 6 10.28 6 8ZM8 8C8 9.178 8.822 10 10 10C11.178 10 12 9.178 12 8C12 6.822 11.178 6 10 6C8.822 6 8 6.822 8 8Z"
                fill="#f47c77"
              />
            </svg></Link>
          </li>}
          {
            isAdmin?<button className={styles.orangeButton} onClick={()=>{
              localStorage.clear();
              window.location.reload();
             }}>Выйти</button>:''
          }
        </ul>
      </div>
    </header>
  );
}

export default Header;