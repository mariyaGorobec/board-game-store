import style from '../index.module.scss'
import styles from "./Orders.module.scss";
import React from "react";
import axios from "axios";
import Skeleton from "../components/Skeleton";
import Order from "../components/Order/Order";
import AppContext from '../context';

import { useNavigate } from 'react-router-dom';



function Orders(){
    const [isLoading, setIsLoading] = React.useState(true);
    const [orders, setOrders] = React.useState([]);
   const [orderId, setOrderId] = React.useState([]); 
    const [totalPrice, setTotalPrice] = React.useState([]); 
    const [date, setDate] = React.useState([]); 
    const {setIsAuth} = React.useContext(AppContext);
    const [name,setName] = React.useState('');
   // const navigate = React.useNavigate();
    
  React.useEffect(() =>{
    (async () => {
      const token = window.localStorage.getItem('token');
      if (token){

      await axios.get('http://localhost:5555/auth/me',{
        headers: {
          'authorization': `Bearer ${token}`
        }}).then(res=>setName(res.data.name));
       await axios.get('http://localhost:5555/getOrders',{
        headers: {
          'authorization': `Bearer ${token}`
        },
      }).then(res=>{
        //setName(res.data.user.name);
        
        setOrders(res.data);
        setTotalPrice(res.data.map(obj=>obj.totalPrice));
        setOrderId(res.data.map(obj => obj._id));
        setDate(res.data.map(obj => obj.createdAt));
      })
      /*setTotalPrice(resp.data.map(obj=>obj.totalPrice));
        setOrderId(resp.data.map(obj => obj._id));
        ;*/
      
    }
    
       setIsLoading(false);
    
    })();
  },[])
  
 return (
    <div className={style.content}>
        <div>
             <div className={styles.topAndButton}>
             <div className={styles.top}>
              <h1>Добро пожаловать, </h1>
              <span className={styles.name}>{name}</span>
              <span>!</span>
             </div>
             <button className={styles.orangeButton} onClick={()=>{
              localStorage.clear();
              setIsAuth(false);
              window.location.reload();
             }}>Выйти</button>
             </div>
             <h2>Ваши заказы</h2>
        </div>
    <div className={`${styles.orders} ${isLoading ? '' : styles.ordersColumn}`}>
  {isLoading ? [...new Array(10)].map(()=><Skeleton/>) : (orders.length > 0 ? (
     
    orders.map((item,index) =><Order item = {item.products}  orderId = {orderId[index]} date = {date[index]} totalPrice = {totalPrice[index]}></Order>)
    ): <div className= {styles.emptyOrder}>
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