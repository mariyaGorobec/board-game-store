import styles from "./Registration.module.scss";


import React from 'react';

import {Link} from 'react-router-dom'; 
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {

  const [name, setName] = React.useState(``);
  const [lastName, setlastName] = React.useState(``);
  const [patronymic, setPatronymic] = React.useState(``);
  const [email,setEmail] = React.useState(``);
  const [localityShipping,setLocalityShipping] = React.useState(``);
  const [addressShipping,setAddressShipping] = React.useState(``);
  const [postcode,setPostcode] = React.useState(``);
  const [password1,setPassword1] = React.useState(``);
  const [password2,setPassword2] = React.useState(``);
  const navigate = useNavigate();

  const onSubmit = (event)=>{
    event.preventDefault();
    if(password1!==password2){
      setPassword1('');
      setPassword2('');
      alert("Пароли не совпадают!")
    }
   else{
    axios.post('http://localhost:5555/auth/register',{
      name: name,
      lastName: lastName,
      patronymic: patronymic,
      email: email,
      password: password1,
      localityShipping: localityShipping,
      addressShipping: addressShipping,
      postcode:postcode
    }).then(res=>{
      alert('Вы успешно зарегистрировались!')
      navigate("/login");
    }).catch(error=>{
      if(error.response.data.message){
        alert(error.response.data.message)
      }
      else{
        error.response.data.map(item=>alert(item.msg))
      }
    })
   }
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
          value={lastName}
          onChange={(event)=>{
            setlastName(event.target.value)
          }}
        />
        <input
          class="text"
          type="text"
          name="name"
          placeholder="Имя"
          required=""
          value={name}
          onChange={(event)=>{
            setName(event.target.value)
          }}
        />
        <input
          class="text"
          type="text"
          name="patronymic"
          placeholder="Отчество (при наличии)"
          value={patronymic}
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
          value={email}
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
          value={localityShipping}
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
          value={addressShipping}
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
          value={postcode}
          onChange={(event)=>{
            setPostcode(event.target.value)
          }}
        />
        <input
          class="text"
          type="password"
          name="password"
          placeholder="Введите пароль"
          required=""
          value={password1}
          onChange={(event)=>{
            setPassword1(event.target.value)
          }}
        />
        <input
          class="text"
          type="password"
          name="password"
          placeholder="Повторите пароль"
          required=""
          value={password2}
          onChange={(event)=>{
            setPassword2(event.target.value)
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
