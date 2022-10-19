import Card from "./components/Card/Card";
import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header/Header";
import React from "react";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  React.useEffect(()=>{
    fetch('https://634e5d25f34e1ed826899d31.mockapi.io/items')
    . then((resp)=>{
      return resp.json();
    })
    .then((json)=> {
      setItems(json);
    });
  },[]);
  const addToCart = (item) =>{
    setCartItems(prev=>[...prev, item]);
  }
  return (
    <div className="wrapper">
      {cartOpened ? (
        <Drawer
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
      <div className="content">
        <div className="titleAndSearch">
          <h1>Все настолки</h1>
          <div className="searchBlock">
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
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            <input placeholder="Найти..."></input>
          </div>
        </div>
        <div className="cards">
          {items.map((item) => (
            <Card
              title={item.title}
              imgURL={item.imgURL}
              description={item.description}
              price={item.price}
              onPlus={(item)=>{
                addToCart(item);
              }}
            ></Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
