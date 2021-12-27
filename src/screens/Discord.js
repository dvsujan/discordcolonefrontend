import React from 'react'
import './discord.css'
import Messages from '../components/Messages'
import {BrowserRouter as Router , Switch, Route, Link, Redirect} from 'react-router-dom'; 
import {useState,useEffect, useContext} from 'react';  
import { io } from "socket.io-client";
import { useHistory } from "react-router-dom";
import SideChannelBar from '../components/SideChannelBar'
import ServerSideBar from '../components/ServerSideBar'
import UsersBar from './UsersBar'
import adduser from './assets/adduser.svg'
import plus from './assets/plus.svg'
import AddUser from '../components/popups/AddUsers'; 
import AddChannel from '../components/popups/AddChannel'; 
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Lottie from "lottie-react";
import * as serverLoding from './assets/serverAnimation.json'
import {SocketContext} from '../context/socket'; 
const token = localStorage.getItem('token');


export default function Discord() {
    const serverId = window.location.href.split('/')[4];  
    const socket = useContext(SocketContext);  
    const [loggedIn, setLoggedIn] = useState(false); 
    const [id, setId] = useState('') 
    const [connected, setConnected] = useState(true); 
    const [loading, setLoading] = useState(true);  
    let history = useHistory();
    
    socket.on('connect_failed', function() {
        console.log('eror');  
    });  
    const doStuff = ()=>{
        socket.emit('hello',{message:'hello'}) 
     }     
  
    const checkLogin = ()=>{ 
        const token = localStorage.getItem('token');  
        if(token){ 
            setLoggedIn(true);
        }     
        if(!token){ 
            history.push('/login')
        }
    }
    
    useEffect(()=>{ 
        socket.on('user-connected',(resu)=>{ 
            if(resu.message === 'done'){ 
                setLoading(false); 
            }
        })
    },[]) 
    
    useEffect(()=>{ 
        checkLogin(); 
        console.log("checking Login"); 
    },[serverId]) 
    return (
        <div>
        {loading?(
            <div style={{display:'flex', alignItems: 'center', justifyContent: 'center',height:'100vh',backgroundColor:'#36393F', flexDirection:'column'}}>
                <Lottie animationData={serverLoding} />
                <p style={{color:'white'}}>Loading</p> 
            </div>
        ):(<div className="discordpage">
            <div className="servers">
                <ServerSideBar/>
            </div>
            <div className="channels">
                <div className='textChannels'>
                    <div className="ibar">
                        {serverId?(<div className='txtnav'>
                            <p style={{fontSize:'12px'}}>Text Channels</p> 
                            <div className="adduser">
                                <Popup trigger={<img src={adduser}/> } position="bottom center">
                                    <AddUser/> 
                                </Popup> 
                            </div> 
                            <div className="createchannel">
                            <Popup trigger={<img src={plus}/> } position="right top">
                                    <AddChannel/>
                                </Popup>
                            </div> 
                        </div>):null} 
                        <SideChannelBar/>
                    </div> 
                </div> 
                <div className='voiceChannels'>
                    <div className="ibar">
                        <p style={{fontSize:'12px'}}>Voice Channels</p>
                        <p style={{fontSize:'12px'}}>this feature is currently in development we'll notify you if it is avalable </p> 
                    </div>
                </div> 
            </div> 
            <div className="messages">
                <Messages id={id}></Messages>
            </div>
            <div className="users">
                <UsersBar/>
            </div>
        </div>)} 
        
    </div>
    )
}
