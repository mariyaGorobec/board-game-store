
import React, {useState} from "react";
import axios from "axios";

import AppContext from '../context';

import styles from "./NewGame.module.scss";

function NewGame(){
    const [title,setTitle] = React.useState();
    const [description,setDescription] = React.useState();
    const [price,setPrice] = React.useState();
    const [imgURL,setImgURL] = React.useState();
    const token = window.localStorage.getItem('token');

    const onCreate = async(event)=>{
        event.preventDefault();
            if (token && token !== null){
                await axios.post('http://localhost:5555/games',{ title: title,
                description: description,
                price: price,
                imgURL: imgURL},{
                    headers: {
                        'authorization': `Bearer ${token}`
                      }
                }).then(resp => {
               window.location.reload();
                alert("Игра добавлена!");
              }).catch(error=>error.response.data.map(item=>alert(item.msg)));
            }
        
      /*axios.post('http://localhost:5555/games',{
            
            headers: {
                'authorization': `Bearer ${token}`
              }
        
        }).then(resp => {
          window.location.reload();
          alert("Игра добавлена!");
        });*/
        console.log(token);
      
    }
 return (
    <div className={styles.content}>
    <h2>Создать игру</h2>
    <form onSubmit={onCreate}>
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
  
    <button className={styles.orangeButton}>Создать продукт</button>
  
    </form>
    
  </div>
 );   
}
export default NewGame;