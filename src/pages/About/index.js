import React, { useState } from "react";
import "./style.css";
import Main from "../../components/Main";

const About = () => {
  const [btn, setBtn] = useState(true);

  const handleClick1 = () => {
    setBtn(true);
  }
  const handleClick2 = () => {
    setBtn(false);
  }

  return (<div id="about">
    <Main>
      <button onClick={handleClick1}>Tim pupin</button>
      <button onClick={handleClick2}>Mentori</button>
      {btn
        ? <ul>
          <li>
            <img src="/img/avatars/pupin/BojanMajmunovic.jfif"></img>
            <h3>Bojan Majmunovic</h3>
            <p></p>
          </li>
          <li>
            <img src="/img/avatars/pupin/IvanaDjuric.jfif"></img>
            <h3>Ivana Djuric</h3>
            <p></p>
          </li>
          <li>
            <img src="/img/avatars/pupin/LukaBorak.jfif"></img>
            <h3>Luka Borak</h3>
            <p></p>
          </li>
          <li>
            <img src="/img/avatars/pupin/MladenJovic.jfif"></img>
            <h3>Mladen Jovic</h3>
            <p></p>
          </li>
          <li>
            <img src="/img/avatars/pupin/NenadPejic.jfif"></img>
            <h3>Nenad Pejic</h3>
            <p></p>
          </li>
          <li>
            <img src="/img/avatars/pupin/NevenaBrajic.jfif"></img>
            <h3>Nevena Brajic</h3>
            <p></p>
          </li>
          <li>
            <img src="/img/avatars/pupin/SlobodanKocic.jfif"></img>
            <h3>Slobodan Kocic</h3>
            <p></p>
          </li>
          <li>
            <img src="/img/avatars/pupin/StevanPopovic.jfif"></img>
            <h3>Stevan Popovic</h3>
            <p></p>
          </li>
        </ul>
        : <ul>
          <li>
            <img src="/img/avatars/mentors/DankoNovovic.jfif"></img>
            <h3>Danko Novovic</h3>
            <p></p>
          </li>
          <li>
            <img src="/img/avatars/mentors/IvanHerceg.jpg"></img>
            <h3>Ivan Herceg</h3>
            <p></p>
          </li>
          <li>
            <img src="/img/avatars/mentors/MarinkoJankovic.png"></img>
            <h3>Marinko Jankovic</h3>
            <p></p>
          </li>
          <li>
            <img src="/img/avatars/mentors/NevenaMasovic.jpg"></img>
            <h3>Nevena Masovic</h3>
            <p></p>
          </li>
          <li>
            <img src="/img/avatars/mentors/NikolaPetkovic.png"></img>
            <h3>Nikola Petkovic</h3>
            <p></p>
          </li>
          <li>
            <img src="/img/avatars/mentors/SvetozarStojkovic.jpg"></img>
            <h3>Svetozar Stojkovic</h3>
            <p></p>
          </li>
          <li>
            <img src="/img/avatars/mentors/VeljkoStanojevic.jfif"></img>
            <h3>Veljko Stanojevic</h3>
            <p></p>
          </li>
        </ul>
      }
    </Main>
  </div>);
}

export default About;