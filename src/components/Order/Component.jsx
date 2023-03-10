

import React from "react";
import Card from "../Card/Card";
import DivideNumberIntoСategory from "../DivideNumberIntoСategory";
import styles from "./Order.module.scss";


const Component = ({ array}) => {

  return( <div>
    <h2>Заказ # </h2>
    <div className={styles.order}>
      {array.map((obj) => (
       <Card
      key={obj.id}
       title={obj.title}
       imgURL={obj.imgURL}
       description={obj.description}
       price={obj.price}
     ></Card>
      ))}
    </div>
    <h4>
      Общая стоимость заказа (с учётом доставки и скидки):{" "}
      руб.
    </h4>
  </div>)
 
}

export default Component;
