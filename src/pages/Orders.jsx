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

 return (
    <div className={style.content}>
        <div className={style.titleAndSearch}>
             <h1>Мои заказы</h1>
        </div>
    <div className={`${styles.orders} ${isLoading ? '' : styles.ordersColumn}`}>
  {isLoading ? [...new Array(10)].map(()=><Skeleton/>) : (orders.length > 0 ? (orders.map((item,index) =><Order item = {item} orderId = {orderId[index]} totalPrice = {totalPrice[index]} ></Order>)): <div className= {styles.emptyOrder}>
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