import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation";
import './style.css'; 

const Welcome = () => {
  const year=new Date().getFullYear();   
  return (
    <div className="wrapper">
      <Navigation/> 
      <div className="welcome">
        <div className="section1">
            <div className="text">
                <h1>Title</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dolorem similique recusandae provident aliquam reprehenderit!</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dolorem similique recusandae provident aliquam reprehenderit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dolorem similique recusandae provident aliquam reprehenderit!</p>
            </div>
            <div className="image" style={{backgroundImage: `url(${"/img/photos/lunch.webp"}`}} /> 
        </div>

        <div className="section2">
            <h2 className="title">More than <span style={{color:"green"}}>156</span> restaurants</h2>
            <div className="gallery">
                <div>
                  <img src="/img/restaurants/McDonalds.webp"/>
                  <div class="text">
                    <h4>McDonalds</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dolorem similique recusandae</p>
                  </div>
                </div>
                <div>
                  <img src="/img/restaurants/KFC.webp"/>
                  <div class="text">
                    <h4>KFC</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dolorem similique recusandae</p>
                  </div>  
                </div>
                <div>
                  <img src="/img/restaurants/FishChips.webp"/>
                  <div class="text">
                    <h4>FishChips</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dolorem similique recusandae</p>
                  </div>
                </div>
                <div>
                  <img src="/img/restaurants/japanese.webp"/>
                  <div class="text">
                    <h4>Chinese</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dolorem similique recusandae</p>
                  </div>
                </div> 
            </div>
       
            <h2 className="title">More than a hundred dishes</h2>
            <div className="gallery">
                <div><img src="/img/dishes/pizza.webp"/></div>
                <div><img src="/img/dishes/eggs.webp"/></div>
                <div><img src="/img/dishes/burger.webp"/></div>
                <div><img src="/img/dishes/croasaint.webp"/></div> 
            </div>
        </div>

      </div>
      <div className="footer">
        <small>&copy; Copyright {year}, Pupin Team</small>
      </div>
    </div> 
  )
}

export default Welcome;