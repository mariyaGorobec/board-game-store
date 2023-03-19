import Card from "../components/Card/Card";
import Skeleton from "../components/Skeleton";
import style from '../index.module.scss'
import * as React from 'react';







function Home({items, onRemoveProduct, isLoading, searchValue, setSearchValue, onChangeSearchInput,onAddToFavorite,addToCart, cartItems, favorites}) {

  
  return(
        <div className={style.content}>
        <div className={style.titleAndSearch}>
          <div className={style.headline}>
          <h1>{searchValue ? `Поиск по запросу: ` : "Все настолки"}
          </h1>
          <span>{searchValue ?  searchValue : ""}</span>
          </div>
          <div className={style.searchBlock}>
          {searchValue&&<svg
              onClick = {()=> setSearchValue('')}
              className={style.clear}
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="31"
                height="31"
                rx="7.5"
                fill="white"
                stroke="#f47c77"
              />
              <path
                d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z"
                fill="#f47c77"
              />
            </svg>}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.25 15.25L11.8855 11.8795L15.25 15.25ZM13.75 7.375C13.75 9.06576 13.0784 10.6873 11.8828 11.8828C10.6873 13.0784 9.06576 13.75 7.375 13.75C5.68424 13.75 4.06274 13.0784 2.86719 11.8828C1.67165 10.6873 1 9.06576 1 7.375C1 5.68424 1.67165 4.06274 2.86719 2.86719C4.06274 1.67165 5.68424 1 7.375 1C9.06576 1 10.6873 1.67165 11.8828 2.86719C13.0784 4.06274 13.75 5.68424 13.75 7.375V7.375Z"
                stroke="#f47c77"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input onChange={onChangeSearchInput} value = {searchValue} placeholder="Найти..."></input>
          </div>
        </div>
        <div className={style.cards}>
          
          {isLoading ? [...new Array(10)].map(()=><Skeleton/>):
            items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item,index) => (
            <Card
              key = {item.id}
              _id={item._id}
              hash = {item.hash}
              title={item.title}
              imgURL={item.imgURL}
              description={item.description}
              price={item.price}
              onFavorite = {(obj) => onAddToFavorite(obj)}
              favorited = {favorites.some((obj)=>obj._id===item._id)}
              added = {
                cartItems.some((obj)=>obj._id===item._id)
              }
              onPlus={(obj)=>{
                addToCart(obj);
              }}
              onRemoveProduct={(obj)=> {
                onRemoveProduct(obj)
              }}

            ></Card>
          ))}
         
        </div>
        
      </div>
    );
}
export default Home;