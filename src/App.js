import Home from "./pages/Home";
import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header/Header";
import axios  from "axios";
import style from './index.module.scss'
import Favorites from "./pages/Favorites";
import {Route, Routes} from 'react-router-dom';
import React from "react";
import crc32 from 'crc-32';
import AppContext from "./context";
import Orders from "./pages/Orders";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] =  React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const cart = [];
  const favorite = [];
  const arr1 = [];
  const arr2 =[];
 
  
  React.useEffect(()=>{
  
    async function fetchData(){
      const token = window.localStorage.getItem('token');
      if (token){
        await axios('http://localhost:5555/cart',{
        headers: {
          'authorization': `Bearer ${token}`
        },
      }).then(resp=>resp.data.map(item=>axios.get(`http://localhost:5555/games/${item}`).then(res=>{
       cart.push(res.data)
      })));
      await axios('http://localhost:5555/favorites',{
        headers: {
          'authorization': `Bearer ${token}`
        },
      }).then(resp=>resp.data.map(item=>axios.get(`http://localhost:5555/games/${item}`).then(res=>{
        favorite.push(res.data)
      })));
      
    
      }
   
      const itemsResponse = await axios.get('http://localhost:5555/games');
      
      

      setCartItems(cart);
      setFavorites(favorite);
      setItems(itemsResponse.data);
      setIsLoading(false);

    }
    fetchData();
  },[]);


  const addToCart = (id) =>{
    let data = cartItems.find(item=>item._id===id)
    if(!data){
      const newItem = []
    const token = window.localStorage.getItem('token');
    if (token){
      axios(`http://localhost:5555/addToCart?productId=${id}`,{
      headers: {
        'authorization': `Bearer ${token}`
      },
    }).then(resp=>resp.data.map(item=>axios.get(`http://localhost:5555/games/${item.id}`).then(res=>{
      newItem.push(res.data);
     })))
     setCartItems(newItem);
  }
    }
    else {
      onRemoveItem(id);
    }
        //axios.post('https://634e5d25f34e1ed826899d31.mockapi.io/cart', obj).then(res=>setCartItems(prev=>[...prev, res.data]));
       
   
  }
  const removeFromFavorites = (id) => {
    const token = window.localStorage.getItem('token');
    if (token){
      axios(`http://localhost:5555/removeFromFavorites?productId=${id}`,{
      headers: {
        'authorization': `Bearer ${token}`
      },
    }).then(res=>setFavorites((prev)=> prev.filter(item => item._id !== id)));
  }


  }
  const onRemoveItem = (id) => {
    const token = window.localStorage.getItem('token');
    if (token){
      axios(`http://localhost:5555/removeFromCart?productId=${id}`,{
      headers: {
        'authorization': `Bearer ${token}`
      },
    }).then(res=>setCartItems((prev)=> prev.filter(item => item._id !== id)));
  }


  }
  const onAddToFavorite = (id) => {
     let data = favorites.find(item=>item._id===id)
    if(!data){
      const newFavorite = []
    const token = window.localStorage.getItem('token');
    if (token){
      axios(`http://localhost:5555/addToFavorites?productId=${id}`,{
      headers: {
        'authorization': `Bearer ${token}`
      },
    }).then(resp=>resp.data.map(item=>axios.get(`http://localhost:5555/games/${item.id}`).then(res=>{
      newFavorite.push(res.data);
     })))
     setFavorites(newFavorite);
  }
    }
    else {
      removeFromFavorites(id);
    }
        //axios.post('https://634e5d25f34e1ed826899d31.mockapi.io/cart', obj).then(res=>setCartItems(prev=>[...prev, res.data]));

   
}




  items.map((item)=>{
    item.hash = crc32.str(item.id + item.title + item.description); 
  })

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const isItemAdded = (_id) =>{
    return cartItems.some(item => item._id === _id);
  }

  return (
   <AppContext.Provider value={{favorites, items,cartItems, isItemAdded, setCartOpened, setCartItems,addToCart, isLoading}}>
     <div className={style.wrapper}>
      {
        <Drawer
          key = {items.id}
          opened = {cartOpened}
          onRemove = {onRemoveItem}
          items={cartItems}
          onClose={() => {
            setCartOpened(false);
          }}
        />
      }
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
            
            onAddToFavorite={onAddToFavorite}
          />}
        />
         <Route  path="/orders" element={
          <Orders
            
            /*onAddToFavorite={onAddToFavorite}*/
          />}
        />
      </Routes>
    </div>
   </AppContext.Provider>
  );
}

export default App;