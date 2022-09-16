import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

const arr = [
  {
    title: "Найди печеньки!",
    imgURL: "/img/games/NaydiPechenki.jpg",
    description: "Кто из вас главный сладкоежка?",
    price: 1490,
  },
  {
    title: "Мачи Коро",
    imgURL: "/img/games/MachoСoro.jpg",
    description: "Станьте лучшим градостроителем Японии",
    price: 1290,
  },
  {
    title: "Взрывные котята",
    imgURL: "/img/games/VzryvnieKotyata.jpg",
    description: "Милые пушистики смертельно опасны",
    price: 990,
  },
];

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
          {arr.map((obg) => (
            <Card
              title={obg.title}
              imgURL={obg.imgURL}
              description={obg.description}
              price={obg.price}
            >
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
