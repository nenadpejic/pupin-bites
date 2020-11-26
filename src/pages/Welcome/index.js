import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar"
import './style.css';

const Welcome = () => {
  return (
    <div className="wrapper">
      <NavBar/>
      <div className="welcome">
        <div className="section1">
          <div className="text">
            <h1>It's LunchTime!</h1>
            <p>Your work team wants to order some food from the restaurant, but...</p>
            <p><b>What food?</b></p>
            <p><b>Which restaurant?</b></p>
            <p>Decide democratically! This app can help you.</p>
          </div>
          <div className="image" style={{backgroundImage:`url(${"/img/photos/lunch.webp"})`}}>
            
          </div>
        </div>
          <div className="section2">
            <h2 className="title">
              More than <span style={{ color: "green" }}>156</span> restaurants
            </h2>
            <div className="gallery">
                <div>
                  <img src="/img/restaurants/McDonalds.webp" alt="McDonalds"/>
                  <div className="text">
                    <h4>McDonalds</h4>
                    <p>McDonald's Hash Browns, McDonald's Happy Meal, Five Guys Cheeseburger, McDonald's Egg McMuffin</p>
                  </div>
                </div>
                <div>
                  <img src="/img/restaurants/KFC.webp" alt="KFC"/>
                  <div className="text">
                    <h4>KFC</h4>
                    <p>KFC Original Recipe Chicken, Chick-fil-A Chicken Sandwich, Culver's ButterBurger, Subway Chicken Bacon Ranch Melt</p>
                  </div>  
                </div>
                <div>
                  <img src="/img/restaurants/FishChips.webp" alt="FishChips"/>
                  <div className="text">
                    <h4>FishChips</h4>
                    <p>Whataburger Taquito with Cheese, Taco Bell Burrito Supreme, Arby's Roast Beef Sandwich, Taco Bell's Nacho Fries</p>
                  </div>
                </div>
                <div>
                  <img src="/img/restaurants/japanese.webp" alt="Chinese"/>
                  <div className="text">
                    <h4>Chinese</h4>
                    <p>Szechuan, Panda Express' Kung Pao Chicken, Shitake Fried Rice with Water Chestnuts</p>
                  </div>
                </div> 
            </div>

            <h2 className="title">More than a hundred dishes</h2>
            <div className="gallery">
                <div><img src="/img/dishes/pizza.webp" alt="pizza" title="pizza"/></div>
                <div><img src="/img/dishes/eggs.webp" alt="eggs" title="eggs"/></div>
                <div><img src="/img/dishes/burger.webp" alt="burger" title="burger"/></div>
                <div><img src="/img/dishes/croasaint.webp" alt="croasaint" title="croasaint"/></div> 
                <div><img src="/img/dishes/wings.webp" alt="wings" title="wings"/></div>
                <div><img src="/img/dishes/tacos.webp" alt="tacos" title="tacos"/></div>
                <div><img src="/img/dishes/donut.webp" alt="donut" title="donut"/></div>
                <div><img src="/img/dishes/pancakes.webp" alt="pancakes" title="pancakes"/></div> 
            </div>
          </div>
      </div>
    
    <Footer/>
</div>
)
}

export default Welcome;
