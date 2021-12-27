import React from 'react';
import LoginSide from '../assets/sideImage.svg'
import {useState, useEffect, useRef} from 'react'
import './Login.css'
import validator from 'validator'
import axios from 'axios'; 
import {BrowserRouter as Router , Switch, Route, Link, Redirect, useHistory} from 'react-router-dom'; 

const URL = 'http://localhost:5000'

export default function RegisterScreen(){
  const [loading, setLoading] = useState(false); 
  const [err, setErr] = useState({bool:false, value:'enter all the values correctly'});
  const history = useHistory();
  const emailRef = useRef(); 
  const passwordRef = useRef(); 
  const usernameRef = useRef(); 
  
  const OnBtnPress = ()=>{
    const emaill = emailRef.current.value;   
    const passwordd = passwordRef.current.value;   
    const usernamee = usernameRef.current.value;  
    if(validator.isEmail(emaill)&&passwordd.length>8&&usernamee.length>3){ 
        setErr({bool:false});
        setLoading(true);  
        axios.post(URL+'/api/v1/user/register/', {
              email:emaill, password:passwordd,username:usernamee
          })
          .then(function (response) {
            console.log(response);
            if(response.data.message=='User created'){ 
                history.push("/login");
              }
            else{ 
              setErr({bool:true, value:response.data.message}); 
            }

          })
          .catch(function (error) {
            console.log(error);
          });
    } 
    else{ 
      console.log("all fields are required"); 
      setErr({bool:true, value:'enter all the values correctly'}); 
    }
  } 
  
  return(
      <div className="registerScreen">
        <div className="registerCard">
            <h2>Create an account</h2>
            {err.bool?(<div className="error">
              <p>{err.value}</p>
            </div>):null}
            <div class="registerInput">
            <label>EMAIL</label> 
            <input type='email' className="emailForm" ref={emailRef}/> 
            </div> 
            <div class="registerInput">
            <label>USERNAME</label> 
            <input type='name' className="emailForm" ref={usernameRef} /> 
            </div>
            <div class="registerInput">
            <label>PASSWORD</label> 
            <input type='password' className="emailForm" ref={passwordRef}/> 
            </div>
             <div className='btncnt'>
              <button className="Continuebtn"onClick={OnBtnPress} >Continue</button> 
            </div>
            <a href="/login" className="haveAccount">Already have an account?</a> 
            <div className="tandc">
              <p>by creating account you accept all the <a herf="#" className="tandca">terms and conditions</a> of this app</p> 
            </div> 
        </div>
            
      </div> 
    
  )
}