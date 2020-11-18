
import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { createPoll, createRestourant, createVote, getAllPolls, getAllRestourants, getOnePoll, login, updateRestourant } from './services';

// Components
import { Register } from './components/register';



function App() {
  const tokenRef = useRef(JSON.parse(localStorage.getItem("Token")))
  const token = tokenRef.current
  //token stavljen u ref da ne renderuje.
  console.log(token)

  useEffect(() => {
    //zakucan login za admin ...treba napraviti formu za login
    login({
      username: "admin@hungryherceg.com",
      password: "123"
    }).then(res => {
      console.log(res.data)
      localStorage.setItem("Token", JSON.stringify(res.data.access_token));
    })
    // zakomentarisano da ne bi non stop kreirao restorane 
    // createRestourant().then (res=>{
    //   console.log(res)
    // })

    // updateRestourant().then(res=>{
    //   console.log(res)
    // })


    //vraca niz svih restorana 
    getAllRestourants(token).then(res => {
      // console.log(res.data)
    })

    //vraca niz svih anketa
    getAllPolls(token).then(res => {
      console.log(res.data)
    })

    //data je array Id-ova restorana za koje se glasa(prvo getujemo restorane uzimamo id za svakog) i label( neki naslov ankete - pokupiti iz inputa)
    //zakucana dva id od restorana kao primer 
    //vraca datum kreiranja / active(true,false) / id ankete / podatke restorana

    //zakomentarisano da ne bih non stop pravio pollove :D

    //   createPoll(token,{
    //     "label": "Radna subota",
    //     "restaurants": ["20ce30a6-fe28-4c75-a37a-5499851af079","40e2faaf-2ac7-4016-b935-7c917dbf86b5"]
    // }).then(res=>{
    //   console.log(res)
    // })



    //Glasanje - prvi argument je pollID, drugi je Id restorana za koji se glasa iz tog polla
    //vraca uvek 1 , logicno bi bilo da povecava za 1 svaki poziv ...pitacemo

    //zakucan aktivan poll i glas za restoran sa tim id
    createVote(`a7daf06d-23e0-40fb-97ab-4bca3b527550`, { restaurantId: "40e2faaf-2ac7-4016-b935-7c917dbf86b5" })
      .then(res => {
        // console.log(res.data)
      })


    //zakucan id od jednog polla
    // vraca datum , id ,label,active(true,false)
    getOnePoll(`a7daf06d-23e0-40fb-97ab-4bca3b527550`).then(res => {
      console.log(res)
    })
  }, [])

  return (
    <div className="App">
      <Router>
        <h1>Test</h1>
        <Route exact path="/login">
          <Register />
        </Route>
        <Route exact path="/"></Route>
        <Route exact path="/create-poll"></Route>
      </Router>

    </div>
  );
}

export default App;
