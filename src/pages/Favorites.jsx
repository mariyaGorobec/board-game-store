import Card from "../components/Card/Card";
import AppContext from "../context";
import React from "react";
import style from '../index.module.scss'

function Favorites({onAddToFavorite}){
  const {favorites} = React.useContext(AppContext);
 return (
    <div className={style.content}>
        <div className={style.titleAndSearch}>
             <h1>Избранное</h1>
        </div>
    <div className={style.cards}>
    {favorites.map((item,index) => (
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
          ))}
    </div>
  </div>
 );   
}
export default Favorites;