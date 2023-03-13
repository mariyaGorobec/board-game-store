import styles from "./Registration.module.scss";


import React, {useState} from 'react';

import {Link} from 'react-router-dom'; 
import axios from "axios";

function Registration() {

  const [name, setName] = React.useState(``);
  const [lastName, setlastName] = React.useState(``);
  const [patronymic, setPatronymic] = React.useState(``);
  const [email,setEmail] = React.useState(``);
  const [localityShipping,setLocalityShipping] = React.useState(``);
  const [addressShipping,setAddressShipping] = React.useState(``);
  const [postcode,setPostcode] = React.useState(``);
  const [password,setPassword] = React.useState(``);

  const onSubmit = (event)=>{
    event.preventDefault();
    axios.post('http://localhost:4444/auth/register',{
      name: name,
      lastName: lastName,
      patronymic: patronymic,
      email: email,
      password: password,
      localityShipping: localityShipping,
      addressShipping: addressShipping,
      postcode:postcode
    }).then(res=>{
      alert('Register')
    })
  }
  
  return (
    <div className={styles.content}>
      <h2>Регистрация</h2>
      <form onSubmit={onSubmit}>
        <input
          class="text"
          type="text"
          name="lastName"
          placeholder="Фамилия"
          required=""
          onChange={(event)=>{
            setName(event.target.value)
          }}
        />
        <input
          class="text"
          type="text"
          name="name"
          placeholder="Имя"
          required=""
          onChange={(event)=>{
            setlastName(event.target.value)
          }}
        />
        <input
          class="text"
          type="text"
          name="patronymic"
          placeholder="Отчество (при наличии)"
          onChange={(event)=>{
            setPatronymic(event.target.value)
          }}
        />
        <input
          class="text"
          type="text"
          name="email"
          placeholder="Email"
          required=""
          onChange={(event)=>{
            setEmail(event.target.value)
          }}
        />
        <input
          class="text"
          type="text"
          name="localityShipping"
          placeholder="Город"
          required=""
          onChange={(event)=>{
            setLocalityShipping(event.target.value)
          }}
        />
        <input
          class="text"
          type="text"
          name="addressShipping"
          placeholder="Адрес"
          required=""
          onChange={(event)=>{
            setAddressShipping(event.target.value)
          }}
        />
        <input
          class="text"
          type="text"
          name="postcode"
          placeholder="Почтовый индекс"
          required=""
          onChange={(event)=>{
            setPostcode(event.target.value)
          }}
        />
        <input
          class="text"
          type="text"
          name="password"
          placeholder="Пароль"
          required=""
          onChange={(event)=>{
            setPassword(event.target.value)
          }}
        />
 <div className={styles.buttons}>
        <button className={styles.orangeButton}>Создать аккаунт</button>
        <Link to='/login'> <button className={styles.yellowButton}> Войти в аккаунт</button></Link>
      </div>
      </form>
     
    </div>
  );
}
export default Registration;
