import { getByTitle } from "@testing-library/react";
import axios from "axios";
import React from "react";
import Card from "../Card/Card";
import DivideNumberIntoСategory from "../DivideNumberIntoСategory";
import styles from "./Order.module.scss";


const Order = ({ item}) => {
const [array,setArray]=React.useState([]);
React.useMemo(()=>{
  (async () => {
    await item.map(item=> {
      axios.get(`http://localhost:5555/games/${item}`).then(resp => array.push(resp.data))
      })
       console.log(array)
  })();
  
  
   
},[item])
return( <div>
  <h2>Заказ # </h2>
  <div className={styles.order}>
   {console.log(`это массив${array}`)}
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

export default Order;
