import './App.css';
import FormConstructor from './components/form/FormConstuctor.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainMenu from './views/main/MainMenu.js';
function App() {
  //const [token, setToken] = useState();
  //if(!token) {
    //return <Login setToken={setToken} />
  //}
  return (
    <div className="App">
      <div>
        <MainMenu/>
      </div>
    </div>
  );
}

export default App;
