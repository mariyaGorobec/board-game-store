import React from "react";
import AppContext from "../../context";

import Card from "../Card/Card";
import DivideNumberIntoСategory from "../DivideNumberIntoСategory";
import styles from "./Order.module.scss";

const Order = ({ date, item, totalPrice, orderId }) => {
  const {isAdmin} = React.useContext(AppContext);
  const [isOrder, setIsOrder] = React.useState(false);
  
  const dateOrder = new Date(date).toLocaleString();
  return (
    <> {isAdmin?(<div>
      <div className={styles.top}>
        <h3>Заказ № </h3>
        <span>{item._id}</span>
      </div>
      <div className={styles.priceAndDate}>
        <span>
          Фамилия:{" "}{item.user.lastName}
        </span>
        <span>Имя:{" "}{item.user.name} </span>
        <span>Отчество (при наличии):{" "}{item.user.patronymic}</span>
        <span>email:{" "}{item.user.email}</span>
        <span>Населённый пункт:{" "}{item.user.localityShipping}</span>
        <span>Адрес:{" "} {item.user.addressShipping}</span>
        <span>Почтовый индекс:{" "}{item.user.postcode}</span>
        <span>
          Общая стоимость заказа:{" "}
          <DivideNumberIntoСategory num={item.totalPrice}></DivideNumberIntoСategory> {" "}руб.
        </span>
        <span>
          Дата заказа:{" "}{dateOrder}
        </span>
      </div>
      <div className={styles.order}>
        {item.products.map((obj) => (
          <Card
            key={obj._id}
            title={obj.title}
            imgURL={obj.imgURL}
            description={obj.description}
            price={obj.price}
            isOrder={!isOrder}
          ></Card>
        ))}
      </div>
    </div>):(<div>
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
    </div>)}
    </>
  );
};

export default Order;
