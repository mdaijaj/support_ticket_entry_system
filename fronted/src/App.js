import './App.css';
import react, {useEffect, useState} from 'react';
import Navbar from './components/navbar'
import "./style.css";
import Routing from './components/menubar';

const App=()=> {
  const [login, setLogin]= useState("")

  return (
    <>
    <div className="App">
      <Navbar login={login}/>
      <Routing/>
    </div>
    </>
  );
}

export default App;
