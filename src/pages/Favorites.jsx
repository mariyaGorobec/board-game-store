import Card from "../components/Card/Card";
import AppContext from "../context";
import React from "react";
import style from '../index.module.scss'
import Skeleton from "../components/Skeleton";
import styles from "./Favorites.module.scss";

function Favorites({onAddToFavorite}){
  const {favorites, isLoading} = React.useContext(AppContext);
 return (
    <div className={style.content}>
        <div className={style.titleAndSearch}>
             <h1>Избранное</h1>
        </div>
    <div className={style.cards}>
      {isLoading ? [...new Array(10)].map(()=><Skeleton/>) : (favorites.length > 0 ? (favorites.map((item,index) => (
            <Card
              key = {item.title}
              id = {item.id}
              hash = {item.hash}
              title={item.title}
              imgURL={item.imgURL}
              description={item.description}
              price={item.price}
              favorited = {true}
              onFavorite = {onAddToFavorite}
            ></Card>
    ))) : <div className= {styles.emptyBookmarks}>
    <img src = "/img/Broken_Heart_symbol.svg.png" width={130} height={130}></img>
    <h3>Вы не сдлелали сердечко красным ни на одном товаре :С</h3>
    <p>Пожалуйста, добавьте хотя бы один товар в избранное, чтобы отобразить его здесь.</p>
    </div> )}
    </div>
  </div>
 );   
}
export default Favorites;