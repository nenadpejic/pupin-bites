import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import "./style.css";

const Welcome = () => {
  return (
    <>
      <div className="wrapper">
        <NavBar />
        <div className="welcome">
          <div className="section1">
            <div className="text">
              <h1>Title</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                dolorem similique recusandae provident aliquam reprehenderit!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                dolorem similique recusandae provident aliquam reprehenderit!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                dolorem similique recusandae provident aliquam reprehenderit!
              </p>
            </div>
            <div
              className="image"
              style={{ backgroundImage: `url(${"/img/photos/lunch.webp"}` }}
            />
          </div>

          <div className="section2">
            <h2 className="title">
              More than <span style={{ color: "green" }}>156</span> restaurants
            </h2>
            <div className="gallery">
              <div>
                <img src="/img/restaurants/McDonalds.webp" alt="McDonalds" />
                <div className="text">
                  <h4>McDonalds</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                    dolorem similique recusandae
                  </p>
                </div>
              </div>
              <div>
                <img src="/img/restaurants/KFC.webp" alt="KFC" />
                <div className="text">
                  <h4>KFC</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                    dolorem similique recusandae
                  </p>
                </div>
              </div>
              <div>
                <img src="/img/restaurants/FishChips.webp" alt="FishChips" />
                <div className="text">
                  <h4>FishChips</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                    dolorem similique recusandae
                  </p>
                </div>
              </div>
              <div>
                <img src="/img/restaurants/japanese.webp" alt="Chinese" />
                <div className="text">
                  <h4>Chinese</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                    dolorem similique recusandae
                  </p>
                </div>
              </div>
            </div>

            <h2 className="title">More than a hundred dishes</h2>
            <div className="gallery">
              <div>
                <img src="/img/dishes/pizza.webp" alt="pizza" />
              </div>
              <div>
                <img src="/img/dishes/eggs.webp" alt="eggs" />
              </div>
              <div>
                <img src="/img/dishes/burger.webp" alt="burger" />
              </div>
              <div>
                <img src="/img/dishes/croasaint.webp" alt="croasaint" />
              </div>
            </div>
            <div>
              <img
                src="/img/restaurants/japanese.webp"
                alt="japanes restaurant"
              />
              <div className="text">
                <h4>Chinese</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                  dolorem similique recusandae
                </p>
              </div>
            </div>
          </div>

          <h2 className="title">More than a hundred dishes</h2>
          <div className="gallery">
            <div>
              <img src="/img/dishes/pizza.webp" alt="pizza" />
            </div>
            <div>
              <img src="/img/dishes/eggs.webp" alt="eggs" />
            </div>
            <div>
              <img src="/img/dishes/burger.webp" alt="burger" />
            </div>
            <div>
              <img src="/img/dishes/croasaint.webp" alt="croasaint" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Welcome;
