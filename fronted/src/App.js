import './App.css';
import Navbar from './components/navbar'
import "./style.css";
import Routing from './components/menubar';
// import axios from "axios";

const App=()=> {

  // axios.defaults.withCredentials= true;

  return (
    <>
    <div className="App">
      <Navbar/>
      <Routing/>
    </div>
    </>
  );
}

export default App;
