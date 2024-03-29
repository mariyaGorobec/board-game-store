import React, { useState } from "react";
import axios from "axios";

import AppContext from "../context";

import styles from "./NewGame.module.scss";
import { useNavigate } from "react-router-dom";

function EditingGame() {
  const [title, setTitle] = React.useState();
  const [description, setDescription] = React.useState();
  const [price, setPrice] = React.useState();
  const [imgURL, setImgURL] = React.useState();
  const token = window.localStorage.getItem("token");

  const { idProduct } = React.useContext(AppContext);
  const navigate = useNavigate();
  React.useEffect(() => {
    async function fetchData() {
      const token = window.localStorage.getItem("token");
      if (token && token !== null) {
        await axios(`http://localhost:5555/gameOne?id=${idProduct}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }).then((res) => {
          setTitle(res.data.title);
          setDescription(res.data.description);
          setPrice(res.data.price);
          setImgURL(res.data.imgURL);
        });
      }
    }
    fetchData();
  }, []);

  const onEdit = async (event) => {
    event.preventDefault();
    if (token && token !== null && idProduct) {
      await axios
        .post(
          `http://localhost:5555/gameEdit`,
          {
            title: title,
            description: description,
            gameId: idProduct,
            price: price,
            imgURL: imgURL,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((resp) => {
          navigate("/");
          window.location.reload();
          alert("Игра изменина!");
        })
        .catch((error) => error.response.data.map((item) => alert(item.msg)));
    } else {
      alert("Вы не выбрали игру");
    }
  };
  return (
    <div className={styles.content}>
      <h2>Редактировать игру</h2>
      <form onSubmit={onEdit}>
        <input
          class="text"
          type="text"
          name="title"
          placeholder="Название"
          required=""
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <input
          class="text"
          type="text"
          name="description"
          placeholder="Описание"
          required=""
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <input
          class="number"
          type="number"
          name="price"
          placeholder="Цена"
          value={price}
          required=""
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />
        <input
          class="url"
          type="url"
          name="imgURL"
          placeholder="Ссылка на картинку товара"
          required=""
          value={imgURL}
          onChange={(event) => {
            setImgURL(event.target.value);
          }}
        />

        <button className={styles.orangeButton}>Редактировать продукт</button>
      </form>
    </div>
  );
}
export default EditingGame;
