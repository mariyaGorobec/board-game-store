import styles from "./Drawer.module.scss";
import Info from "../Info.jsx";
import React from "react";

import axios  from "axios";
import DivideNumberIntoСategory from "../DivideNumberIntoСategory";
import { useCart } from "../hooks/useCart";

function Drawer({ onClose, onRemove, items = [], opened }) {
  const {setCartItems, cartItems,totalPrice} = useCart();
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [orderID, setOrderID] = React.useState([]);
  
 
  let delivery = 0;
  totalPrice<5000?delivery+=250:delivery=0;

  let discount = 0;
  totalPrice<10000?discount=0:discount=totalPrice*0.02;
  
  const onClickOrder= async()=>{
   try {
    const total = Math.round(totalPrice+delivery-discount);
    const {data} = await axios.post('https://634e5d25f34e1ed826899d31.mockapi.io/orders', { 
    items: cartItems,
    id: cartItems.id,
    totalPrice: total,
    });
    
    setOrderId(data.id);
    setOrderID(data.id);
    setIsOrderComplete(true);
      for(let i = 0; i<cartItems.length;i++){
        const a = cartItems[i];
        let b = cartItems.find(item => item.hash === a.hash);
        if (b!== undefined){
          await axios.delete(`https://634e5d25f34e1ed826899d31.mockapi.io/cart/${b.id}`).then(setCartItems((prev)=> prev.filter(item => Number(item.hash) !== Number(a.hash))));
        }
       
      }
      
   } catch (error) {
    alert("Ошибка при создании заказа! :С");
   }
  }

  return (
   
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible: ''} ${opened ? document.body.style.overflowY = 'hidden': document.body.style.overflowY = 'scroll'}`}>
      <div className={styles.drawer}>
        <h2>
          Корзина
          <svg
            onClick={onClose}
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
          </svg>
        </h2>
        {items.length > 0 ? (
          <>
            {" "}
            <div className={styles.items}>
              {items.map((obj) => (
                
                <div key={obj} className={styles.cartItem}>
                  <img
                    width={70}
                    height={70}
                    src={obj.imgURL}
                    alt={obj.title}
                  ></img>
                  <div>
                    <p>{obj.title}</p>
                    <b>{<DivideNumberIntoСategory num = {obj.price}></DivideNumberIntoСategory>} руб.</b>
                  </div>
                  <svg
                    onClick={() => onRemove(obj.id)}
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
                  </svg>
                </div>
              ))}
            </div>
            <div className={styles.cartTotalBlock}>
              <ul>
                <li>
                  <span>Доставка по городу: </span>
                  <div></div>
                  <b>{delivery} руб.</b>
                </li>
                <li>
                  <span>Скидка 2%: </span>
                  <div></div>
                  <b>{Math.round(discount)} руб.</b>
                </li>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{<DivideNumberIntoСategory num = {Math.round(totalPrice+delivery-discount)}></DivideNumberIntoСategory>} руб.</b>
                </li>
              </ul>
              <button onClick={onClickOrder} className={styles.orangeButton}>
                Оформить заказ{" "}
                <img
                  className={styles.arrow}
                  src="/img/arrow.svg"
                  alt="arrow"
                ></img>
              </button>
            </div>{" "}
          </>
        ) : (
          <Info
            title={isOrderComplete ? "Поздравляю! Заказ оформлен!" :"Корзине грустно, когда в ней пусто :С"}
            description={isOrderComplete ? `Ваш заказ №${orderId} оформлен и скоро будет передан курьерской службе.` : "Пожалуйста, добавьте хотя бы один товар в корзину, чтобы сделать заказ."}
            imgURL={isOrderComplete ? "/img/complete-order.jpg" :"/img/empty-cart.jpg"}
          ></Info>
        )}
      </div>
    </div>
    
  );
}

export default Drawer;
