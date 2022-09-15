import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

function App() {
  return (
    <div className="wrapper">
     <Drawer></Drawer>
      <Header></Header>
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
          <Card></Card>
          <div className="card">
            <div className="cardTop">
              <img
                width={133}
                height={112}
                src="/img/games/MachoСoro.jpg"
                alt=""
              ></img>
              <h5>Мачи Коро</h5>
              <span>Станьте лучшим градостроителем Японии!</span>
            </div>
            <div className="cardBottom">
              <div className="price">
                <span> Цена:</span>
                <b>1290 руб.</b>
              </div>
              <button>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.6653 5.13128H7.20219V1.66827C7.20219 0.332907 5.13118 0.332907 5.13118 1.66827V5.13128H1.66805C0.332981 5.13128 0.332981 7.20221 1.66805 7.20221H5.13118V10.6652C5.13118 12.0006 7.20219 12.0006 7.20219 10.6652V7.20221H10.6653C12.0006 7.20221 12.0006 5.13128 10.6653 5.13128Z"
                    fill="#f47c77"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="card">
            <div className="cardTop">
              <img
                width={133}
                height={112}
                src="/img/games/VzryvnieKotyata.jpg"
                alt=""
              ></img>
              <h5>Взрывные котята</h5>
              <span>Милые пушистики смертельно опасны!</span>
            </div>
            <div className="cardBottom">
              <div className="price">
                <span> Цена:</span>
                <b>990 руб.</b>
              </div>
              <button>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.6653 5.13128H7.20219V1.66827C7.20219 0.332907 5.13118 0.332907 5.13118 1.66827V5.13128H1.66805C0.332981 5.13128 0.332981 7.20221 1.66805 7.20221H5.13118V10.6652C5.13118 12.0006 7.20219 12.0006 7.20219 10.6652V7.20221H10.6653C12.0006 7.20221 12.0006 5.13128 10.6653 5.13128Z"
                    fill="#f47c77"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
