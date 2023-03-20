import styles from "./Login.module.scss";

import React from "react";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../context";

function Login() {
  const { setIsAdmin, setIsAuth } = React.useContext(AppContext);

  const [email, setEmail] = React.useState(``);
  const [password, setPassword] = React.useState(``);
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5555/auth/login", {
        email: email,
        password: password,
      })
      .then((resp) => {
        const userInfo = resp.data;
        localStorage.setItem("token", `${userInfo.token}`);
        if (userInfo) {
          if (userInfo.user.role) {
            setIsAdmin(true);
          } else {
            setIsAuth(true);
          }
          navigate("/");
          window.location.reload();
        }
      })
      .catch((error) => {
        if (error.response.data.message) {
          alert(error.response.data.message);
        } else {
          error.response.data.map((item) => alert(item.msg));
        }
      });
  };

  return (
    <div className={styles.content}>
      <h2>Войти</h2>
      <form onSubmit={onSubmit}>
        <input
          class="email"
          type="email"
          name="Email"
          placeholder="Email"
          required=""
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          class="text"
          type="password"
          name="Password"
          placeholder="Пароль"
          required=""
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div className={styles.buttons}>
          <Link to="/register">
            {" "}
            <button className={styles.orangeButton}>Создать аккаунт</button>
          </Link>
          <button className={styles.yellowButton}> Войти в аккаунт</button>
        </div>
      </form>
    </div>
  );
}
export default Login;
