import React from 'react';
import LoginSide from '../assets/sideImage.svg'
import './Login.css'
import {useState, useRef} from 'react'
import {BrowserRouter as Router , Switch, Route, Link, Redirect, useHistory} from 'react-router-dom'; 
import axios from 'axios'; 
import validator from 'validator'
const URL = 'http://localhost:5000'

export default function LoginScreen(){
    const BURL='https://i.ibb.co/nD6nbML/discord-Background.jpg';
    const history = useHistory();
    const [focused, setFocused] = useState('#5865F2');  
    const [err, setErr] = useState({bool:false, value:'password must contatin 8 charaters'});  
    const [loading, setLoading] = useState(false);  
    const emailRef = useRef(); 
    const passwordRef = useRef();  
    
    const signinPress = (e)=>{
      e.preventDefault();
      const emaill = emailRef.current.value ; 
      const passwordd = passwordRef.current.value ; 
      if(validator.isEmail(emaill)&&passwordd){ 
        axios.post(URL+'/api/v1/user/login',{
          email: emaill, 
          password:passwordd, 
        }).then((res)=>{
          if(res.data.message == 'Auth successful'){ 
            localStorage.setItem('token',res.data.token); 
            sessionStorage.setItem('token',res.data.token); 
            history.push("/app");
          } 
          else{ 
            setErr({bool:true, value:res.data.message});  
          } 
        })      
        .catch((err)=>{ 
          setErr({bool:true, value:"Oops! Some error occured"})
           
        })
      } 
      else{ 
        setErr({bool:true, value:'enter email correctly'});
      }
    } 
    
    return(
        <div className="Login">
      <div style={{backgroundImage: `url(${BURL})`, height:'100vh', display:'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div className="LoginCard" style={{backgroundColor:'#36393F', borderRadius:'7px', display:'flex'}}>
          <div className="LoginForm" style={{flex:2}}>  
          <div>
            <h3 style={{color:'white', padding:'2%', paddingLeft:'4%', paddingBottom:null}}>Welcome Back!</h3>
            <h4 style={{color:'#99aab5', paddingLeft:'4%'}}>We are so exited to see you again</h4>
          </div>
          <div style={{alignItems:'center', justifyContent: 'center'}}>
          <p>{err.bool?(
              <div className="Eflash">
                {err.value}
              </div>
          ):null}</p> 
          </div>
          <form>
              <div style={{display:'flex',flexDirection:'column'}} className="detales"> 
                <input type="email" style={{backgroundColor:'#303339', padding:'1.2%', margin:'2%',paddingTop:'4%' ,marginRight:'30%', marginLeft:'4%',border:0, broderColor:focused, color:'white', alignItems:'center'}} placeholder="Enter Email" className='EmailF' ref={emailRef}/>
                <input type="password"  style={{backgroundColor:'#303339', padding:'1.2%', margin:'2%',paddingTop:'4%' ,marginRight:'30%', marginLeft:'4%',border:0, broderColor:focused, color:'white', alignItems:'center'}} placeholder="Enter Password" className='PassF' ref={passwordRef} />
              </div> 
              <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <button style={{paddingLeft:'25%', paddingRight:'35%', paddingTop:'2.5%', paddingBottom:'2.5%', marginRight:'35%', marginLeft:'10%', marginTop:'4%', backgroundColor:'#4752C4', color:'white', borderRadius:7, border:0}} className='signbtn' onClick={signinPress}>Login</button> 
              </div> 
          </form>
            <div className='have'>
              <p>Need an account?</p><a href="/register" className='register'>Register</a>
            </div>
        </div>
        <div className='sideImage' style={{backgroundColor:'white', flex:1}}>
          <img src={LoginSide} alt='akdfja' style={{height:'100%', width:'100%'}}/> 
        </div> 
      </div> 
      </div> 
    </div>
    )
}
