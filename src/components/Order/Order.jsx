import React from "react";

import Card from "../Card/Card";
import DivideNumberIntoСategory from "../DivideNumberIntoСategory";
import styles from "./Order.module.scss";

const Order = ({ date, item, totalPrice, orderId }) => {
  const dateOrder = new Date(date).toLocaleString();

  return (
    <div>
      <div className={styles.top}>
        <h3>Заказ № </h3>
        <span>{orderId}</span>
      </div>
      <div className={styles.priceAndDate}>
        <span>
          Общая стоимость заказа (с учётом доставки и скидки):{" "}
          <DivideNumberIntoСategory num={totalPrice}></DivideNumberIntoСategory> {" "}руб.
        </span>
        <span>Дата оформления заказа: {dateOrder}</span>
      </div>
      <div className={styles.order}>
        {item.map((obj) => (
          <Card
            key={obj._id}
            title={obj.title}
            imgURL={obj.imgURL}
            description={obj.description}
            price={obj.price}
          ></Card>
        ))}
      </div>
    </div>
  );
};

export default Order;
