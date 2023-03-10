import style from '../index.module.scss'
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
    const [arr1, setArr1] = React.useState([]); 
    const arr2 = [];

    React.useEffect(() =>{
      (async () => {
     
        const token = window.localStorage.getItem('token');
        await axios('http://localhost:5555/orders',{
        headers: {
          'authorization': `Bearer ${token}`
        },
      }).then(res=>setArr1(res.data.array));
        //setTotalPrice(data.map(obj=>obj.totalPrice));
        //setOrderId(data.map(obj => obj.id));
       // setOrders(data.map(obj => obj.items));
        
       setIsLoading(false);
  
      })();
    },[]);

 return (
    <div className={style.content}>
      
        <div className={style.titleAndSearch}>
             <h1>Мои заказы</h1>
        </div>
    <div className={`${styles.orders} ${isLoading ? '' : styles.ordersColumn}`}>
  {isLoading ? [...new Array(10)].map(()=><Skeleton/>) : (arr1.length > 0 ? (arr1.map((item,index) =><Order item = {item}  ></Order>)): <div className= {styles.emptyOrder}>
    <img src = "/img/purchase-order-4.png" width={130} height={130}></img>
    <h3>Здесь могли быть ваши заказы:С</h3>
    <p>Пожалуйста, сделайте хотя бы один заказ, чтобы он отобразился здесь.</p>
    </div> )}
  {/*isLoading ? [...new Array(10)].map(()=><Skeleton/>) : (
    orders.map((item,index) =><Order item = {item} orderId = {orderId[index]} totalPrice = {totalPrice[index]} ></Order>))*/}
    </div>
  </div>
 );   
}
export default Orders;