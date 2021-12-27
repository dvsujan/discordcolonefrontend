import React,{useState, useEffect} from 'react';
import Bgimg from './assets/discordBackground.jpg'
import {BrowserRouter as Router , Switch, Route, Link, Redirect} from 'react-router-dom'; 
import LoginScreen from './screens/LoginScreen'; 
import RegisterScreen from './screens/RegisterScreen';
import Discord from './screens/Discord'
import LandingPage from './screens/LandingPage';
import {SocketContext, socket} from './context/socket';

function App() {
  const [loggedIn, setLoggedIn] = useState(false); 
  const getIsLoggedIn = async ()=>{ 
    if(sessionStorage.getItem('token')){ 
      setLoggedIn(true); 
    }
  } 
  useEffect(()=>{ 
    getIsLoggedIn();
  },[]) 
  
  return (
      <SocketContext.Provider value={socket}> 
      <Router>
        <div className="app"> 
        <Switch>
        <Route exact path='/'>
          <LandingPage/> 
        </Route> 
        <Route exact path='/login'>
          {loggedIn ? <Redirect to="/app" /> : <LoginScreen/>} 
        </Route>
        <Route exact path='/register'>
          {loggedIn ? <Redirect to="/app" /> : <RegisterScreen/>} 
        </Route> 
       <Route path='/app' component={Discord}/>
        </Switch>
        </div> 
      </Router>
      </SocketContext.Provider> 
   );
}

export default App;
