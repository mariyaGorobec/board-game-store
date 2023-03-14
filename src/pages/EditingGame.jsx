
import React, {useState} from "react";
import axios from "axios";

import AppContext from '../context';

import styles from "./NewGame.module.scss";
import { useNavigate } from 'react-router-dom';

function EditingGame(){
    const [title,setTitle] = React.useState();
    const [description,setDescription] = React.useState();
    const [price,setPrice] = React.useState();
    const [imgURL,setImgURL] = React.useState();
    const token = window.localStorage.getItem('token');

    const {idProduct} = React.useContext(AppContext);
    const navigate = useNavigate();

    
    const onEdit = async(event)=>{
        event.preventDefault();
            if (token && token !== null&&idProduct){
                await axios.post(`http://localhost:5555/gameEdit`,{ title: title,
                description: description,
                gameId:idProduct,
                price: price,
                imgURL: imgURL},{
                    headers: {
                        'authorization': `Bearer ${token}`
                      }
                }).then(resp => {
                  navigate("/");
               window.location.reload();
                alert("Игра изменина!");
              })
            }
            else(
              alert("Вы не выбрали игру")
            )
        
      /*axios.post('http://localhost:5555/games',{
            
            headers: {
                'authorization': `Bearer ${token}`
              }
        
        }).then(resp => {
          window.location.reload();
          alert("Игра добавлена!");
        });*/
    }
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
        onChange={(event)=>{
            setTitle(event.target.value)
        }}
      />
      <input
        class="text"
        type="text"
        name="description"
        placeholder="Описание"
        required=""
        onChange={(event)=>{
            setDescription(event.target.value);
        }}
      />
      <input
        class="text"
        type="text"
        name="price"
        placeholder="Цена"
        required=""
        onChange={(event)=>{
            setPrice(event.target.value);
        }}
      />
      <input
        class="text"
        type="text"
        name="imgURL"
        placeholder="Ссылка на картинку товара"
        required=""
        onChange={(event)=>{
            setImgURL(event.target.value);
        }}
      />
  
    <button className={styles.orangeButton}>Редактировать продукт</button>
  
    </form>
    
  </div>
 );   
}
export default EditingGame;