import React from "react";

import Card from "../Card/Card";
import DivideNumberIntoСategory from "../DivideNumberIntoСategory";
import styles from "./Order.module.scss";

const Order = ({ item, orderId, totalPrice }) => {
  return (
    <div>
      <h2>Заказ # {orderId}</h2>
      <div className={styles.order}>
        {item.map((obj) => (
          <Card
            key={obj.title}
            id={obj.id}
            hash={obj.hash}
            title={obj.title}
            imgURL={obj.imgURL}
            description={obj.description}
            price={obj.price}
          ></Card>
        ))}
      </div>
      <h4>
        Общая стоимость заказа (с учётом доставки и скидки):{" "}
        <DivideNumberIntoСategory num={totalPrice}></DivideNumberIntoСategory>{" "}
        руб.
      </h4>
    </div>
  );
};

export default Order;
