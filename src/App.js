import Home from "./pages/Home";
import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header/Header";
import axios  from "axios";
import Favorites from "./pages/Favorites";
import {Route, Routes} from 'react-router-dom';
import React from "react";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] =  React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  React.useEffect(()=>{
    axios.get('https://634e5d25f34e1ed826899d31.mockapi.io/items').then(res => setItems(res.data));
    axios.get('https://634e5d25f34e1ed826899d31.mockapi.io/cart').then(res => setCartItems(res.data));
    axios.get('https://634e5d25f34e1ed826899d31.mockapi.io/favorites').then(res => setFavorites(res.data));
  },[]);
  const addToCart = (item) =>{
    axios.post('https://634e5d25f34e1ed826899d31.mockapi.io/cart', item).then(res=>setCartItems(prev=>[...prev, res.data]));
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://634e5d25f34e1ed826899d31.mockapi.io/cart/${id}`);
    setCartItems((prev)=> prev.filter(item => item.id !== id));
  }
  
  const onAddToFavorite = (obj) => {
   try { if (favorites.find((favObj) => favObj.id === obj.id)){
    axios.delete(`https://634e5d25f34e1ed826899d31.mockapi.io/favorites/${obj.id}`);
    setFavorites((prev)=> prev.filter(item => item.id !== obj.id));
  }
    else {
      axios.post('https://634e5d25f34e1ed826899d31.mockapi.io/favorites', obj).then(res=>setFavorites(prev=>[...prev, res.data]));
    }
  }
   catch(error){
    alert("Не удалось добавить в избранное")
  }
}

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
        <Route path="/" element={<Home
        items = {items}
        searchValue = {searchValue}
        setSearchValue = {setSearchValue}
        onChangeSearchInput = {onChangeSearchInput}
        onAddToFavorite = {onAddToFavorite}
        addToCart = {addToCart}
        />}
        />
        <Route path="/favorites" element={
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
