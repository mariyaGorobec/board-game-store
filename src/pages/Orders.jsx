import style from "../index.module.scss";
import styles from "./Orders.module.scss";
import React from "react";
import axios from "axios";
import Skeleton from "../components/Skeleton";
import Order from "../components/Order/Order";
import AppContext from "../context";

import { useNavigate } from "react-router-dom";

function Orders() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [orders, setOrders] = React.useState([]);
  const [orderId, setOrderId] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState([]);
  const [date, setDate] = React.useState([]);
  const { setIsAuth, isAdmin } = React.useContext(AppContext);
  const [name, setName] = React.useState("");
  const [allOrders, setAllOrders] = React.useState([]);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = React.useState("");
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  React.useEffect(() => {
    (async () => {
      const token = window.localStorage.getItem("token");
      if (token) {
        if (isAdmin) {
          await axios
            .get("http://localhost:5555/allOrders", {
              headers: {
                authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              setAllOrders(res.data);
              setDate(res.data.map((obj) => obj.createdAt));
            });
        } else {
          await axios
            .get("http://localhost:5555/auth/me", {
              headers: {
                authorization: `Bearer ${token}`,
              },
            })
            .then((res) => setName(res.data.name));
          await axios
            .get("http://localhost:5555/getOrders", {
              headers: {
                authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              setOrders(res.data);
              setTotalPrice(res.data.map((obj) => obj.totalPrice));
              setOrderId(res.data.map((obj) => obj._id));
              setDate(res.data.map((obj) => obj.createdAt));
            });
        }
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      {isAdmin ? (
        <div className={style.content}>
          <div className={style.titleAndSearch}>
            <div className={style.headline}>
              <h1>{searchValue ? `Поиск по запросу: ` : "Все заказы"}</h1>
              <span>{searchValue ? searchValue : ""}</span>
            </div>
            <div className={style.searchBlock}>
              {searchValue && (
                <svg
                  onClick={() => setSearchValue("")}
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
                </svg>
              )}
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
              <input
                onChange={onChangeSearchInput}
                value={searchValue}
                placeholder="Найти..."
              ></input>
            </div>
          </div>
          <div
            className={`${styles.orders} ${
              isLoading ? "" : styles.ordersColumn
            }`}
          >
            {isLoading ? (
              [...new Array(10)].map(() => <Skeleton />)
            ) : allOrders.length > 0 ? (
              allOrders
                .filter((item) =>
                  item._id.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map((item, index) => (
                  <Order
                    item={item}
                    orderId={0}
                    date={date[index]}
                    totalPrice={0}
                  ></Order>
                ))
            ) : (
              <div className={styles.emptyOrder}>
                <img
                  src="/img/purchase-order-4.png"
                  width={130}
                  height={130}
                ></img>
                <h3>Здесь могли бы быть заказы ваших покупателей:С</h3>
                <p>
                  Пожалуйста, дождитесь, пока хотя бы один пользователь соврешит
                  заказ.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={style.content}>
          <div>
            <div className={styles.topAndButton}>
              <div className={styles.top}>
                <h1>Добро пожаловать, </h1>
                <span className={styles.name}>{name}</span>
                <span>!</span>
              </div>
              <button
                className={styles.orangeButton}
                onClick={() => {
                  localStorage.clear();
                  setIsAuth(false);
                  navigate("/login");
                  window.location.reload();
                }}
              >
                Выйти
              </button>
            </div>
            <h2>Ваши заказы</h2>
          </div>
          <div
            className={`${styles.orders} ${
              isLoading ? "" : styles.ordersColumn
            }`}
          >
            {isLoading ? (
              [...new Array(10)].map(() => <Skeleton />)
            ) : orders.length > 0 ? (
              orders.map((item, index) => (
                <Order
                  item={item.products}
                  orderId={orderId[index]}
                  date={date[index]}
                  totalPrice={totalPrice[index]}
                ></Order>
              ))
            ) : (
              <div className={styles.emptyOrder}>
                <img
                  src="/img/purchase-order-4.png"
                  width={130}
                  height={130}
                ></img>
                <h3>Здесь могли быть ваши заказы:С</h3>
                <p>
                  Пожалуйста, сделайте хотя бы один заказ, чтобы он отобразился
                  здесь.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
export default Orders;
