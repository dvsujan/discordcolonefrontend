import React ,{useState,useEffect,useContext} from 'react'
import Channel from './Channel'
import './channel.css'
import {useHistory, Link} from 'react-router-dom'
import axios from 'axios'; 
import {SocketContext} from '../context/socket'; 

const URL = 'http://localhost:5000/'; 
function SideChannelBar() {
    const serverId = window.location.href.split('/')[4];  
    const [channels, setChannels] = useState([]);  
    const socket = useContext(SocketContext);  
    const getData = ()=>{ 
        axios.get(`${URL}api/v1/channels/getchannel/${serverId}`,{ headers:{'Authorization': 'Bearer ' + localStorage.getItem('token')}}).then(res=>{ 
            console.log(res.data);  
            setChannels(res.data); 
        }) 
    } 
    useEffect(()=>{ 
        getData(); 
    },[serverId])
    return (
        <div className='channelNames'>
            {channels.map((i,index)=> {
                socket.emit('join-room',i.Id); 
                return<Channel id={i.Id} name={i.name}/>
            })}
        </div>
    )
}

export default SideChannelBar
