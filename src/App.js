import Home from "./pages/Home";
import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header/Header";
import axios  from "axios";
//import ContentLoader from "react-content-loader";
import Favorites from "./pages/Favorites";
import {Route, Routes} from 'react-router-dom';
import React from "react";
import crc32 from 'crc-32';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] =  React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
 
  React.useEffect(()=>{
  
    async function fetchData(){
      const cartResponse = await axios.get('https://634e5d25f34e1ed826899d31.mockapi.io/cart');
      const favoriteResponse = await axios.get('https://634e5d25f34e1ed826899d31.mockapi.io/favorites');
      const itemsResponse = await axios.get('https://634e5d25f34e1ed826899d31.mockapi.io/items');

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavorites(favoriteResponse.data);
      setItems(itemsResponse.data);

     

      
    }
    fetchData();
  },[]);
  const addToCart = (obj) =>{
    try{
      let data = cartItems.find(item => item.hash === obj.hash);
      if (data!== undefined){
        axios.delete(`https://634e5d25f34e1ed826899d31.mockapi.io/cart/${data.id}`).then(setCartItems((prev)=> prev.filter(item => Number(item.hash) !== Number(obj.hash))));
        
      }
      else{
        axios.post('https://634e5d25f34e1ed826899d31.mockapi.io/cart', obj).then(res=>setCartItems(prev=>[...prev, res.data]));
       
      }
    } catch (error){
      alert('Не удалось добавить в корзину');
    }
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://634e5d25f34e1ed826899d31.mockapi.io/cart/${id}`);
    setCartItems((prev)=> prev.filter(item => item.id !== id));
  }

  const onAddToFavorite = (obj) => {
    try{
      let data = favorites.find(item => item.hash === obj.hash);
      if (data!== undefined){
        axios.delete(`https://634e5d25f34e1ed826899d31.mockapi.io/favorites/${data.id}`).then(setFavorites((prev)=> prev.filter(item => Number(item.hash) !== Number(obj.hash))));
      }
      else{
        axios.post('https://634e5d25f34e1ed826899d31.mockapi.io/favorites', obj).then(res=>setFavorites(prev=>[...prev, res.data]));
      }
    } catch (error){
      alert('Не удалось добавить в избранное');
    }
}
  items.map((item)=>{
    item.hash = crc32.str(item.id + item.title + item.description); 
  })

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }
  return (
    <div className="wrapper">
      {cartOpened ? (
        <Drawer
          onRemove = {onRemoveItem}
          items={cartItems}
          onClose={() => {
            setCartOpened(false);
          }}
        />
      ) : undefined}
      <Header
        onClickCart={() => {
          setCartOpened(true);
        }}
      ></Header>
     <Routes>
        <Route  path="/" element={<Home
        items = {items}
        favorites = {favorites}
        searchValue = {searchValue}
        setSearchValue = {setSearchValue}
        onChangeSearchInput = {onChangeSearchInput}
        onAddToFavorite = {onAddToFavorite}
        addToCart = {addToCart}
        cartItems = {cartItems}
        isLoading = {isLoading}
        />}
        />
        <Route  path="/favorites" element={
          <Favorites
            items={favorites}
            onAddToFavorite={onAddToFavorite}
          />}
        />
      </Routes>
    </div>
  );
}

export default App;