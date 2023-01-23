import Card from "../components/Card/Card";
import styles from "./Orders.module.scss";
import React from "react";
import axios from "axios";
import Skeleton from "../components/Skeleton";
import Order from "../components/Order/Order";


function Orders(){
    const [isLoading, setIsLoading] = React.useState(true);
    const [orders, setOrders] = React.useState([]);
    const [orderId, setOrderId] = React.useState([]); 
    const [totalPrice, setTotalPrice] = React.useState([]); 
    
  React.useEffect(() =>{
    (async () => {
        const {data} = await axios.get('https://634e5d25f34e1ed826899d31.mockapi.io/orders');
        //setOrders(data.map((obj)=>obj.items).flat());
        //setOrders(data.map(obj=>obj.items));
        setTotalPrice(data.map(obj=>obj.totalPrice));
        setOrderId(data.map(obj => obj.id));
        setOrders(data.map(obj => obj.items));
        //console.log(data.map(obj => obj.items.map(obj1=> obj1.map(item => item.orderId)) = obj.id));
       setIsLoading(false);
       // console.log(orders);
    })();
  },[])
  console.log(orderId);

 return (
    <div className="content">
        <div className="titleAndSearch">
             <h1>Мои заказы</h1>
        </div>
    <div className={styles.orders}>
  
  {isLoading ? [...new Array(10)].map(()=><Skeleton/>) : (
    orders.map((item,index) =><Order item = {item} orderId = {orderId[index]} totalPrice = {totalPrice[index]} ></Order>))}
    </div>
  </div>
 );   
}
export default Orders;