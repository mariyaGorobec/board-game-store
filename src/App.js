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
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import NewGame from "./pages/NewGame";
import EditingGame from "./pages/EditingGame";



function App() {
  const [items, setItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] =  React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [isAuth,setIsAuth] = React.useState(false);
  const [idProduct,setIdProduct] = React.useState();
  const [itemsQty,setItemsQty] = React.useState();
  const [page,setPage] = React.useState();
  const [firstNumber,setFirstNumber] = React.useState(0);
  const [lastNumber,setLastNumber] = React.useState(9);

  React.useEffect(()=>{
  
    async function fetchData(){
      
      
      const token = window.localStorage.getItem('token');
      if (token && token !== null){
        await axios('http://localhost:5555/auth/me',{
        headers: {
          'authorization': `Bearer ${token}`
        },
      }).then(res=>setIsAdmin(res.data.role));
        if(!isAdmin){
          setIsAuth(true);
       
        await axios('http://localhost:5555/cart',{
        headers: {
          'authorization': `Bearer ${token}`
        },
      }).then(res=>setCartItems(res.data));
      
      await axios('http://localhost:5555/favorites',{
        headers: {
          'authorization': `Bearer ${token}`
        },
      }).then(resp=>setFavorites(resp.data));
    
        }
        
      }
   
    await axios.get('http://localhost:5555/games').then(res=>{
      setItems(res.data);
      setPage(res.data.slice(firstNumber,lastNumber));
    });
      
      setIsLoading(false);

    }
    fetchData();
  },[]);


  const addToCart = async (id) =>{
    let info = cartItems.find(item=>item._id===id)
    if(!info){
    const token = window.localStorage.getItem('token');
    if (token){
     await axios(`http://localhost:5555/addToCart?productId=${id}`,{
      headers: {
        'authorization': `Bearer ${token}`
      },
    }).then(resp=>setCartItems(prev=>[...prev, resp.data]));
     
    
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
  const onRemoveProduct = (id) => {
    let isDelete = window.confirm("Вы действительно хотите удалить игру?");
    if(isDelete){
      const token = window.localStorage.getItem('token');
    if (token){
      axios(`http://localhost:5555/game?productId=${id}`,{
      headers: {
        'authorization': `Bearer ${token}`
      },
    }).then(res=>setItems((prev)=> prev.filter(item => item._id !== id)));
  }
    }

  }

  const onAddToFavorite = (id) => {
     let data = favorites.find(item=>item._id===id)
    if(!data){
    const token = window.localStorage.getItem('token');
    if (token){
      axios(`http://localhost:5555/addToFavorites?productId=${id}`,{
      headers: {
        'authorization': `Bearer ${token}`
      },
    }).then(resp=>setFavorites(prev=>[...prev, resp.data]))
     
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
    
   <AppContext.Provider value={{favorites, items,cartItems, idProduct,setIdProduct,isAdmin, setIsAdmin,isItemAdded, setCartOpened, setCartItems,isAuth,setIsAuth,addToCart, isLoading}}>
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
          setCartOpened={setCartOpened}
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
        onRemoveProduct = {onRemoveProduct}
        />}
        />

        <Route  path="/favorites" element={
          isAuth&&!isAdmin ? <Favorites onAddToFavorite={onAddToFavorite}/>: <Login/>}
        />
        <Route  path="/newGame" element={
          isAdmin ? <NewGame/> : ''}
        />
        <Route  path="/login" element={
          !isAuth&&!isAdmin ? <Login/>:''}
        />
        <Route  path="/register" element={
          !isAuth&&!isAdmin ? <Registration/>: ''}
        />
         <Route  path="/orders" element={
          isAuth||isAdmin ? <Orders/>:''}
        />
        <Route  path="/gameEdit" element={
          isAdmin ?  <EditingGame></EditingGame>:''}
        />
        
      </Routes>
    </div>
   </AppContext.Provider>
  );
}

export default App;