import Card from "../components/Card/Card";
function Favorites({items, onAddToFavorite}){
 return (
    <div className="content">
        <div className="titleAndSearch">
             <h1>Избранное</h1>
        </div>
    <div className="cards">
    {items.map((item,index) => (
            <Card
              key = {item.title}
              id = {item.id}
              title={item.title}
              imgURL={item.imgURL}
              description={item.description}
              price={item.price}
              favorited = {true}
              onFavorite = {onAddToFavorite}
            ></Card>
          ))}
    </div>
  </div>
 );   
}
export default Favorites;