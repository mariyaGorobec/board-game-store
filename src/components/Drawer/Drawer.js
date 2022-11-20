import styles from './Drawer.module.scss'

function Drawer({onClose, onRemove, items = []}){
    return (
        <div className={styles.overlay}>
        <div className={styles.drawer}>
          <h2>
            Корзина
            <svg
              onClick={onClose}
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
          </h2>
          {items.length > 0 ? <div> <div className={styles.items}>
            {items.map((obj)=>
            <div className={styles.cartItem}>
            <img
              width={70}
              height={70}
              src={obj.imgURL}
              alt={obj.title}
            ></img>
            <div>
              <p>{obj.title}</p>
              <b>{obj.price}</b>
            </div>
            <svg
              onClick={()=>onRemove(obj.id)}
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
          </div>)}
          </div>
          <div className={styles.cartTotalBlock}>
            <ul>
              <li>
                <span>Итого: </span>
                <div></div>
                <b>1490</b>
              </li>
              <li>
                <span>Налог 5%:</span>
                <div></div>
                <b>74.5</b>
              </li>
            </ul>
            <button className={styles.orangeButton}>
              Оформить заказ <img className = {styles.arrow} src="/img/arrow.svg" alt="arrow"></img>
            </button>
          </div> </div> : <div className={styles.emptyCart}>
            {console.log(items)}
            <img width = {150} height = {150} src='/img/empty-cart.jpg'></img>
            <h3>Корзине грустно, когда в ней пусто :С</h3>
            <p>Пожалуйста, добавьте хотя бы один товар в корзину, чтобы сделать заказ.</p>
            <button onClick={onClose} className={styles.orangeButton}>
            <img className = {styles.arrow} src="/img/arrow.svg" alt="arrow"></img>Вернуться назад
            </button>
            </div>}          
        </div>
      </div>
    );
}

export default Drawer;